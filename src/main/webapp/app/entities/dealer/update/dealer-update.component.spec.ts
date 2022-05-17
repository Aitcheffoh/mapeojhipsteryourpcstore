import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DealerService } from '../service/dealer.service';
import { IDealer, Dealer } from '../dealer.model';
import { IShop } from 'app/entities/shop/shop.model';
import { ShopService } from 'app/entities/shop/service/shop.service';

import { DealerUpdateComponent } from './dealer-update.component';

describe('Dealer Management Update Component', () => {
  let comp: DealerUpdateComponent;
  let fixture: ComponentFixture<DealerUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let dealerService: DealerService;
  let shopService: ShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DealerUpdateComponent],
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
      .overrideTemplate(DealerUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DealerUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    dealerService = TestBed.inject(DealerService);
    shopService = TestBed.inject(ShopService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Shop query and add missing value', () => {
      const dealer: IDealer = { id: 456 };
      const shop: IShop = { id: 55491 };
      dealer.shop = shop;
      const dealerList: IShop = { id: 85502 };
      dealer.dealerList = dealerList;

      const shopCollection: IShop[] = [{ id: 7074 }];
      jest.spyOn(shopService, 'query').mockReturnValue(of(new HttpResponse({ body: shopCollection })));
      const additionalShops = [shop, dealerList];
      const expectedCollection: IShop[] = [...additionalShops, ...shopCollection];
      jest.spyOn(shopService, 'addShopToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ dealer });
      comp.ngOnInit();

      expect(shopService.query).toHaveBeenCalled();
      expect(shopService.addShopToCollectionIfMissing).toHaveBeenCalledWith(shopCollection, ...additionalShops);
      expect(comp.shopsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const dealer: IDealer = { id: 456 };
      const shop: IShop = { id: 92966 };
      dealer.shop = shop;
      const dealerList: IShop = { id: 28317 };
      dealer.dealerList = dealerList;

      activatedRoute.data = of({ dealer });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(dealer));
      expect(comp.shopsSharedCollection).toContain(shop);
      expect(comp.shopsSharedCollection).toContain(dealerList);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Dealer>>();
      const dealer = { id: 123 };
      jest.spyOn(dealerService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dealer });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dealer }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(dealerService.update).toHaveBeenCalledWith(dealer);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Dealer>>();
      const dealer = new Dealer();
      jest.spyOn(dealerService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dealer });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dealer }));
      saveSubject.complete();

      // THEN
      expect(dealerService.create).toHaveBeenCalledWith(dealer);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Dealer>>();
      const dealer = { id: 123 };
      jest.spyOn(dealerService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dealer });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(dealerService.update).toHaveBeenCalledWith(dealer);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackShopById', () => {
      it('Should return tracked Shop primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackShopById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
