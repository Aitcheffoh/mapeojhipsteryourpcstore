import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IQuery, Query } from '../query.model';
import { QueryService } from '../service/query.service';
import { ICustomer } from 'app/entities/customer/customer.model';
import { CustomerService } from 'app/entities/customer/service/customer.service';
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';

@Component({
  selector: 'ceet-query-update',
  templateUrl: './query-update.component.html',
})
export class QueryUpdateComponent implements OnInit {
  isSaving = false;

  customersSharedCollection: ICustomer[] = [];
  productsSharedCollection: IProduct[] = [];

  editForm = this.fb.group({
    id: [],
    price: [null, [Validators.required]],
    dateQuery: [null, [Validators.required]],
    customer: [],
    product: [],
    consultant: [],
    queryList: [],
  });

  constructor(
    protected queryService: QueryService,
    protected customerService: CustomerService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ query }) => {
      this.updateForm(query);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const query = this.createFromForm();
    if (query.id !== undefined) {
      this.subscribeToSaveResponse(this.queryService.update(query));
    } else {
      this.subscribeToSaveResponse(this.queryService.create(query));
    }
  }

  trackCustomerById(_index: number, item: ICustomer): number {
    return item.id!;
  }

  trackProductById(_index: number, item: IProduct): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuery>>): void {
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

  protected updateForm(query: IQuery): void {
    this.editForm.patchValue({
      id: query.id,
      price: query.price,
      dateQuery: query.dateQuery,
      customer: query.customer,
      product: query.product,
      consultant: query.consultant,
      queryList: query.queryList,
    });

    this.customersSharedCollection = this.customerService.addCustomerToCollectionIfMissing(
      this.customersSharedCollection,
      query.customer,
      query.consultant
    );
    this.productsSharedCollection = this.productService.addProductToCollectionIfMissing(
      this.productsSharedCollection,
      query.product,
      query.queryList
    );
  }

  protected loadRelationshipsOptions(): void {
    this.customerService
      .query()
      .pipe(map((res: HttpResponse<ICustomer[]>) => res.body ?? []))
      .pipe(
        map((customers: ICustomer[]) =>
          this.customerService.addCustomerToCollectionIfMissing(
            customers,
            this.editForm.get('customer')!.value,
            this.editForm.get('consultant')!.value
          )
        )
      )
      .subscribe((customers: ICustomer[]) => (this.customersSharedCollection = customers));

    this.productService
      .query()
      .pipe(map((res: HttpResponse<IProduct[]>) => res.body ?? []))
      .pipe(
        map((products: IProduct[]) =>
          this.productService.addProductToCollectionIfMissing(
            products,
            this.editForm.get('product')!.value,
            this.editForm.get('queryList')!.value
          )
        )
      )
      .subscribe((products: IProduct[]) => (this.productsSharedCollection = products));
  }

  protected createFromForm(): IQuery {
    return {
      ...new Query(),
      id: this.editForm.get(['id'])!.value,
      price: this.editForm.get(['price'])!.value,
      dateQuery: this.editForm.get(['dateQuery'])!.value,
      customer: this.editForm.get(['customer'])!.value,
      product: this.editForm.get(['product'])!.value,
      consultant: this.editForm.get(['consultant'])!.value,
      queryList: this.editForm.get(['queryList'])!.value,
    };
  }
}
