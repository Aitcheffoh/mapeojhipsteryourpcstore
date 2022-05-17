import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { QueryService } from '../service/query.service';
import { IQuery, Query } from '../query.model';
import { ICustomer } from 'app/entities/customer/customer.model';
import { CustomerService } from 'app/entities/customer/service/customer.service';
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';

import { QueryUpdateComponent } from './query-update.component';

describe('Query Management Update Component', () => {
  let comp: QueryUpdateComponent;
  let fixture: ComponentFixture<QueryUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let queryService: QueryService;
  let customerService: CustomerService;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [QueryUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(QueryUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(QueryUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    queryService = TestBed.inject(QueryService);
    customerService = TestBed.inject(CustomerService);
    productService = TestBed.inject(ProductService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Customer query and add missing value', () => {
      const query: IQuery = { id: 456 };
      const customer: ICustomer = { id: 58220 };
      query.customer = customer;
      const consultant: ICustomer = { id: 74859 };
      query.consultant = consultant;

      const customerCollection: ICustomer[] = [{ id: 6040 }];
      jest.spyOn(customerService, 'query').mockReturnValue(of(new HttpResponse({ body: customerCollection })));
      const additionalCustomers = [customer, consultant];
      const expectedCollection: ICustomer[] = [...additionalCustomers, ...customerCollection];
      jest.spyOn(customerService, 'addCustomerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ query });
      comp.ngOnInit();

      expect(customerService.query).toHaveBeenCalled();
      expect(customerService.addCustomerToCollectionIfMissing).toHaveBeenCalledWith(customerCollection, ...additionalCustomers);
      expect(comp.customersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Product query and add missing value', () => {
      const query: IQuery = { id: 456 };
      const product: IProduct = { id: 46341 };
      query.product = product;
      const queryList: IProduct = { id: 53515 };
      query.queryList = queryList;

      const productCollection: IProduct[] = [{ id: 47228 }];
      jest.spyOn(productService, 'query').mockReturnValue(of(new HttpResponse({ body: productCollection })));
      const additionalProducts = [product, queryList];
      const expectedCollection: IProduct[] = [...additionalProducts, ...productCollection];
      jest.spyOn(productService, 'addProductToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ query });
      comp.ngOnInit();

      expect(productService.query).toHaveBeenCalled();
      expect(productService.addProductToCollectionIfMissing).toHaveBeenCalledWith(productCollection, ...additionalProducts);
      expect(comp.productsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const query: IQuery = { id: 456 };
      const customer: ICustomer = { id: 71983 };
      query.customer = customer;
      const consultant: ICustomer = { id: 80675 };
      query.consultant = consultant;
      const product: IProduct = { id: 55327 };
      query.product = product;
      const queryList: IProduct = { id: 86512 };
      query.queryList = queryList;

      activatedRoute.data = of({ query });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(query));
      expect(comp.customersSharedCollection).toContain(customer);
      expect(comp.customersSharedCollection).toContain(consultant);
      expect(comp.productsSharedCollection).toContain(product);
      expect(comp.productsSharedCollection).toContain(queryList);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Query>>();
      const query = { id: 123 };
      jest.spyOn(queryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ query });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: query }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(queryService.update).toHaveBeenCalledWith(query);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Query>>();
      const query = new Query();
      jest.spyOn(queryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ query });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: query }));
      saveSubject.complete();

      // THEN
      expect(queryService.create).toHaveBeenCalledWith(query);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Query>>();
      const query = { id: 123 };
      jest.spyOn(queryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ query });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(queryService.update).toHaveBeenCalledWith(query);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackCustomerById', () => {
      it('Should return tracked Customer primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackCustomerById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackProductById', () => {
      it('Should return tracked Product primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackProductById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
