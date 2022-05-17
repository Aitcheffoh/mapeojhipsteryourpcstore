import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IPromos, Promos } from '../promos.model';

import { PromosService } from './promos.service';

describe('Promos Service', () => {
  let service: PromosService;
  let httpMock: HttpTestingController;
  let elemDefault: IPromos;
  let expectedResult: IPromos | IPromos[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PromosService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      dateStart: currentDate,
      dateEnd: currentDate,
      pricePromo: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          dateStart: currentDate.format(DATE_FORMAT),
          dateEnd: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Promos', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          dateStart: currentDate.format(DATE_FORMAT),
          dateEnd: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateStart: currentDate,
          dateEnd: currentDate,
        },
        returnedFromService
      );

      service.create(new Promos()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Promos', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          dateStart: currentDate.format(DATE_FORMAT),
          dateEnd: currentDate.format(DATE_FORMAT),
          pricePromo: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateStart: currentDate,
          dateEnd: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Promos', () => {
      const patchObject = Object.assign(
        {
          pricePromo: 1,
        },
        new Promos()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          dateStart: currentDate,
          dateEnd: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Promos', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          dateStart: currentDate.format(DATE_FORMAT),
          dateEnd: currentDate.format(DATE_FORMAT),
          pricePromo: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateStart: currentDate,
          dateEnd: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Promos', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addPromosToCollectionIfMissing', () => {
      it('should add a Promos to an empty array', () => {
        const promos: IPromos = { id: 123 };
        expectedResult = service.addPromosToCollectionIfMissing([], promos);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(promos);
      });

      it('should not add a Promos to an array that contains it', () => {
        const promos: IPromos = { id: 123 };
        const promosCollection: IPromos[] = [
          {
            ...promos,
          },
          { id: 456 },
        ];
        expectedResult = service.addPromosToCollectionIfMissing(promosCollection, promos);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Promos to an array that doesn't contain it", () => {
        const promos: IPromos = { id: 123 };
        const promosCollection: IPromos[] = [{ id: 456 }];
        expectedResult = service.addPromosToCollectionIfMissing(promosCollection, promos);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(promos);
      });

      it('should add only unique Promos to an array', () => {
        const promosArray: IPromos[] = [{ id: 123 }, { id: 456 }, { id: 49661 }];
        const promosCollection: IPromos[] = [{ id: 123 }];
        expectedResult = service.addPromosToCollectionIfMissing(promosCollection, ...promosArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const promos: IPromos = { id: 123 };
        const promos2: IPromos = { id: 456 };
        expectedResult = service.addPromosToCollectionIfMissing([], promos, promos2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(promos);
        expect(expectedResult).toContain(promos2);
      });

      it('should accept null and undefined values', () => {
        const promos: IPromos = { id: 123 };
        expectedResult = service.addPromosToCollectionIfMissing([], null, promos, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(promos);
      });

      it('should return initial array if no Promos is added', () => {
        const promosCollection: IPromos[] = [{ id: 123 }];
        expectedResult = service.addPromosToCollectionIfMissing(promosCollection, undefined, null);
        expect(expectedResult).toEqual(promosCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
