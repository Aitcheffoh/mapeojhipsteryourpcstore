import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CombosService } from '../service/combos.service';
import { ICombos, Combos } from '../combos.model';
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';

import { CombosUpdateComponent } from './combos-update.component';

describe('Combos Management Update Component', () => {
  let comp: CombosUpdateComponent;
  let fixture: ComponentFixture<CombosUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let combosService: CombosService;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CombosUpdateComponent],
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
      .overrideTemplate(CombosUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CombosUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    combosService = TestBed.inject(CombosService);
    productService = TestBed.inject(ProductService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Product query and add missing value', () => {
      const combos: ICombos = { id: 456 };
      const product: IProduct = { id: 65114 };
      combos.product = product;
      const comboList: IProduct = { id: 44711 };
      combos.comboList = comboList;

      const productCollection: IProduct[] = [{ id: 24384 }];
      jest.spyOn(productService, 'query').mockReturnValue(of(new HttpResponse({ body: productCollection })));
      const additionalProducts = [product, comboList];
      const expectedCollection: IProduct[] = [...additionalProducts, ...productCollection];
      jest.spyOn(productService, 'addProductToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ combos });
      comp.ngOnInit();

      expect(productService.query).toHaveBeenCalled();
      expect(productService.addProductToCollectionIfMissing).toHaveBeenCalledWith(productCollection, ...additionalProducts);
      expect(comp.productsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const combos: ICombos = { id: 456 };
      const product: IProduct = { id: 98459 };
      combos.product = product;
      const comboList: IProduct = { id: 2561 };
      combos.comboList = comboList;

      activatedRoute.data = of({ combos });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(combos));
      expect(comp.productsSharedCollection).toContain(product);
      expect(comp.productsSharedCollection).toContain(comboList);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Combos>>();
      const combos = { id: 123 };
      jest.spyOn(combosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ combos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: combos }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(combosService.update).toHaveBeenCalledWith(combos);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Combos>>();
      const combos = new Combos();
      jest.spyOn(combosService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ combos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: combos }));
      saveSubject.complete();

      // THEN
      expect(combosService.create).toHaveBeenCalledWith(combos);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Combos>>();
      const combos = { id: 123 };
      jest.spyOn(combosService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ combos });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(combosService.update).toHaveBeenCalledWith(combos);
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
