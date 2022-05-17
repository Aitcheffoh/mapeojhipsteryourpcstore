import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICombos, Combos } from '../combos.model';
import { CombosService } from '../service/combos.service';
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';

@Component({
  selector: 'ceet-combos-update',
  templateUrl: './combos-update.component.html',
})
export class CombosUpdateComponent implements OnInit {
  isSaving = false;

  productsSharedCollection: IProduct[] = [];

  editForm = this.fb.group({
    id: [],
    priceCombo: [null, [Validators.required]],
    product: [],
    comboList: [],
  });

  constructor(
    protected combosService: CombosService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ combos }) => {
      this.updateForm(combos);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const combos = this.createFromForm();
    if (combos.id !== undefined) {
      this.subscribeToSaveResponse(this.combosService.update(combos));
    } else {
      this.subscribeToSaveResponse(this.combosService.create(combos));
    }
  }

  trackProductById(_index: number, item: IProduct): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICombos>>): void {
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

  protected updateForm(combos: ICombos): void {
    this.editForm.patchValue({
      id: combos.id,
      priceCombo: combos.priceCombo,
      product: combos.product,
      comboList: combos.comboList,
    });

    this.productsSharedCollection = this.productService.addProductToCollectionIfMissing(
      this.productsSharedCollection,
      combos.product,
      combos.comboList
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
            this.editForm.get('comboList')!.value
          )
        )
      )
      .subscribe((products: IProduct[]) => (this.productsSharedCollection = products));
  }

  protected createFromForm(): ICombos {
    return {
      ...new Combos(),
      id: this.editForm.get(['id'])!.value,
      priceCombo: this.editForm.get(['priceCombo'])!.value,
      product: this.editForm.get(['product'])!.value,
      comboList: this.editForm.get(['comboList'])!.value,
    };
  }
}
