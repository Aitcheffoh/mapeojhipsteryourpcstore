import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPromos, Promos } from '../promos.model';
import { PromosService } from '../service/promos.service';
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';

@Component({
  selector: 'ceet-promos-update',
  templateUrl: './promos-update.component.html',
})
export class PromosUpdateComponent implements OnInit {
  isSaving = false;

  productsSharedCollection: IProduct[] = [];

  editForm = this.fb.group({
    id: [],
    dateStart: [null, [Validators.required]],
    dateEnd: [null, [Validators.required]],
    pricePromo: [null, [Validators.required]],
    product: [],
    promosList: [],
  });

  constructor(
    protected promosService: PromosService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ promos }) => {
      this.updateForm(promos);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const promos = this.createFromForm();
    if (promos.id !== undefined) {
      this.subscribeToSaveResponse(this.promosService.update(promos));
    } else {
      this.subscribeToSaveResponse(this.promosService.create(promos));
    }
  }

  trackProductById(_index: number, item: IProduct): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPromos>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(promos: IPromos): void {
    this.editForm.patchValue({
      id: promos.id,
      dateStart: promos.dateStart,
      dateEnd: promos.dateEnd,
      pricePromo: promos.pricePromo,
      product: promos.product,
      promosList: promos.promosList,
    });

    this.productsSharedCollection = this.productService.addProductToCollectionIfMissing(
      this.productsSharedCollection,
      promos.product,
      promos.promosList
    );
  }

  protected loadRelationshipsOptions(): void {
    this.productService
      .query()
      .pipe(map((res: HttpResponse<IProduct[]>) => res.body ?? []))
      .pipe(
        map((products: IProduct[]) =>
          this.productService.addProductToCollectionIfMissing(
            products,
            this.editForm.get('product')!.value,
            this.editForm.get('promosList')!.value
          )
        )
      )
      .subscribe((products: IProduct[]) => (this.productsSharedCollection = products));
  }

  protected createFromForm(): IPromos {
    return {
      ...new Promos(),
      id: this.editForm.get(['id'])!.value,
      dateStart: this.editForm.get(['dateStart'])!.value,
      dateEnd: this.editForm.get(['dateEnd'])!.value,
      pricePromo: this.editForm.get(['pricePromo'])!.value,
      product: this.editForm.get(['product'])!.value,
      promosList: this.editForm.get(['promosList'])!.value,
    };
  }
}
