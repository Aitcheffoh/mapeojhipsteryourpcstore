import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IShop, Shop } from '../shop.model';

import { ShopService } from './shop.service';

describe('Shop Service', () => {
  let service: ShopService;
  let httpMock: HttpTestingController;
  let elemDefault: IShop;
  let expectedResult: IShop | IShop[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ShopService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nameShop: 'AAAAAAA',
      place: 'AAAAAAA',
      phoneShop: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Shop', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Shop()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Shop', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nameShop: 'BBBBBB',
          place: 'BBBBBB',
          phoneShop: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Shop', () => {
      const patchObject = Object.assign(
        {
          nameShop: 'BBBBBB',
          phoneShop: 1,
        },
        new Shop()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Shop', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nameShop: 'BBBBBB',
          place: 'BBBBBB',
          phoneShop: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Shop', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addShopToCollectionIfMissing', () => {
      it('should add a Shop to an empty array', () => {
        const shop: IShop = { id: 123 };
        expectedResult = service.addShopToCollectionIfMissing([], shop);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(shop);
      });

      it('should not add a Shop to an array that contains it', () => {
        const shop: IShop = { id: 123 };
        const shopCollection: IShop[] = [
          {
            ...shop,
          },
          { id: 456 },
        ];
        expectedResult = service.addShopToCollectionIfMissing(shopCollection, shop);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Shop to an array that doesn't contain it", () => {
        const shop: IShop = { id: 123 };
        const shopCollection: IShop[] = [{ id: 456 }];
        expectedResult = service.addShopToCollectionIfMissing(shopCollection, shop);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(shop);
      });

      it('should add only unique Shop to an array', () => {
        const shopArray: IShop[] = [{ id: 123 }, { id: 456 }, { id: 88397 }];
        const shopCollection: IShop[] = [{ id: 123 }];
        expectedResult = service.addShopToCollectionIfMissing(shopCollection, ...shopArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const shop: IShop = { id: 123 };
        const shop2: IShop = { id: 456 };
        expectedResult = service.addShopToCollectionIfMissing([], shop, shop2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(shop);
        expect(expectedResult).toContain(shop2);
      });

      it('should accept null and undefined values', () => {
        const shop: IShop = { id: 123 };
        expectedResult = service.addShopToCollectionIfMissing([], null, shop, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(shop);
      });

      it('should return initial array if no Shop is added', () => {
        const shopCollection: IShop[] = [{ id: 123 }];
        expectedResult = service.addShopToCollectionIfMissing(shopCollection, undefined, null);
        expect(expectedResult).toEqual(shopCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});