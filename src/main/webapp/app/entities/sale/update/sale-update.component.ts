import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ISale, Sale } from '../sale.model';
import { SaleService } from '../service/sale.service';
import { ICustomer } from 'app/entities/customer/customer.model';
import { CustomerService } from 'app/entities/customer/service/customer.service';
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';
import { IShop } from 'app/entities/shop/shop.model';
import { ShopService } from 'app/entities/shop/service/shop.service';

@Component({
  selector: 'ceet-sale-update',
  templateUrl: './sale-update.component.html',
})
export class SaleUpdateComponent implements OnInit {
  isSaving = false;

  customersSharedCollection: ICustomer[] = [];
  productsSharedCollection: IProduct[] = [];
  shopsSharedCollection: IShop[] = [];

  editForm = this.fb.group({
    id: [],
    dateSale: [null, [Validators.required]],
    valueSale: [null, [Validators.required]],
    customer: [],
    product: [],
    shop: [],
    shopper: [],
    saleList: [],
    listSale: [],
  });

  constructor(
    protected saleService: SaleService,
    protected customerService: CustomerService,
    protected productService: ProductService,
    protected shopService: ShopService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sale }) => {
      this.updateForm(sale);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sale = this.createFromForm();
    if (sale.id !== undefined) {
      this.subscribeToSaveResponse(this.saleService.update(sale));
    } else {
      this.subscribeToSaveResponse(this.saleService.create(sale));
    }
  }

  trackCustomerById(_index: number, item: ICustomer): number {
    return item.id!;
  }

  trackProductById(_index: number, item: IProduct): number {
    return item.id!;
  }

  trackShopById(_index: number, item: IShop): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISale>>): void {
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

  protected updateForm(sale: ISale): void {
    this.editForm.patchValue({
      id: sale.id,
      dateSale: sale.dateSale,
      valueSale: sale.valueSale,
      customer: sale.customer,
      product: sale.product,
      shop: sale.shop,
      shopper: sale.shopper,
      saleList: sale.saleList,
      listSale: sale.listSale,
    });

    this.customersSharedCollection = this.customerService.addCustomerToCollectionIfMissing(
      this.customersSharedCollection,
      sale.customer,
      sale.shopper
    );
    this.productsSharedCollection = this.productService.addProductToCollectionIfMissing(
      this.productsSharedCollection,
      sale.product,
      sale.saleList
    );
    this.shopsSharedCollection = this.shopService.addShopToCollectionIfMissing(this.shopsSharedCollection, sale.shop, sale.listSale);
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
            this.editForm.get('shopper')!.value
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
            this.editForm.get('saleList')!.value
          )
        )
      )
      .subscribe((products: IProduct[]) => (this.productsSharedCollection = products));

    this.shopService
      .query()
      .pipe(map((res: HttpResponse<IShop[]>) => res.body ?? []))
      .pipe(
        map((shops: IShop[]) =>
          this.shopService.addShopToCollectionIfMissing(shops, this.editForm.get('shop')!.value, this.editForm.get('listSale')!.value)
        )
      )
      .subscribe((shops: IShop[]) => (this.shopsSharedCollection = shops));
  }

  protected createFromForm(): ISale {
    return {
      ...new Sale(),
      id: this.editForm.get(['id'])!.value,
      dateSale: this.editForm.get(['dateSale'])!.value,
      valueSale: this.editForm.get(['valueSale'])!.value,
      customer: this.editForm.get(['customer'])!.value,
      product: this.editForm.get(['product'])!.value,
      shop: this.editForm.get(['shop'])!.value,
      shopper: this.editForm.get(['shopper'])!.value,
      saleList: this.editForm.get(['saleList'])!.value,
      listSale: this.editForm.get(['listSale'])!.value,
    };
  }
}
