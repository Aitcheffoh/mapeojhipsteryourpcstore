import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PromosService } from '../service/promos.service';
import { IPromos, Promos } from '../promos.model';
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';

import { PromosUpdateComponent } from './promos-update.component';

describe('Promos Management Update Component', () => {
  let comp: PromosUpdateComponent;
  let fixture: ComponentFixture<PromosUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let promosService: PromosService;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PromosUpdateComponent],
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
      .overrideTemplate(PromosUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PromosUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    promosService = TestBed.inject(PromosService);
    productService = TestBed.inject(ProductService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Product query and add missing value', () => {
      const promos: IPromos = { id: 456 };
      const product: IProduct = { id: 93962 };
      promos.product = product;
      const promosList: IProduct = { id: 84567 };
      promos.promosList = promosList;

      const productCollection: IProduct[] = [{ id: 97035 }];
      jest.spyOn(productService, 'query').mockReturnValue(of(new HttpResponse({ body: productCollection })));
      const additionalProducts = [product, promosList];
      const expectedCollection: IProduct[] = [...additionalProducts, ...productCollection];
      jest.spyOn(productService, 'addProductToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ promos });
      comp.ngOnInit();

      expect(productService.query).toHaveBeenCalled();
      expect(productService.addProductToCollectionIfMissing).toHaveBeenCalledWith(productCollection, ...additionalProducts);
      expect(comp.productsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const promos: IPromos = { id: 456 };
      const product: IProduct = { id: 48553 };
      promos.product = product;
      const promosList: IProduct = { id: 29343 };
      promos.promosList = promosList;

      activatedRoute.data = of({ promos });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(promos));
      expect(comp.productsSharedCollection).toContain(product);
      expect(comp.productsSharedCollection).toContain(promosList);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Promos>>();
      const promos = { id: 123 };
      jest.spyOn(promosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ promos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: promos }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(promosService.update).toHaveBeenCalledWith(promos);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Promos>>();
      const promos = new Promos();
      jest.spyOn(promosService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ promos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: promos }));
      saveSubject.complete();

      // THEN
      expect(promosService.create).toHaveBeenCalledWith(promos);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Promos>>();
      const promos = { id: 123 };
      jest.spyOn(promosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ promos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(promosService.update).toHaveBeenCalledWith(promos);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackProductById', () => {
      it('Should return tracked Product primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackProductById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
