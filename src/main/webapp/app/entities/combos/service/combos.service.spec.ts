import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICombos, Combos } from '../combos.model';

import { CombosService } from './combos.service';

describe('Combos Service', () => {
  let service: CombosService;
  let httpMock: HttpTestingController;
  let elemDefault: ICombos;
  let expectedResult: ICombos | ICombos[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CombosService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      priceCombo: 0,
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

    it('should create a Combos', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Combos()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Combos', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          priceCombo: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Combos', () => {
      const patchObject = Object.assign(
        {
          priceCombo: 1,
        },
        new Combos()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Combos', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          priceCombo: 1,
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

    it('should delete a Combos', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addCombosToCollectionIfMissing', () => {
      it('should add a Combos to an empty array', () => {
        const combos: ICombos = { id: 123 };
        expectedResult = service.addCombosToCollectionIfMissing([], combos);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(combos);
      });

      it('should not add a Combos to an array that contains it', () => {
        const combos: ICombos = { id: 123 };
        const combosCollection: ICombos[] = [
          {
            ...combos,
          },
          { id: 456 },
        ];
        expectedResult = service.addCombosToCollectionIfMissing(combosCollection, combos);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Combos to an array that doesn't contain it", () => {
        const combos: ICombos = { id: 123 };
        const combosCollection: ICombos[] = [{ id: 456 }];
        expectedResult = service.addCombosToCollectionIfMissing(combosCollection, combos);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(combos);
      });

      it('should add only unique Combos to an array', () => {
        const combosArray: ICombos[] = [{ id: 123 }, { id: 456 }, { id: 42355 }];
        const combosCollection: ICombos[] = [{ id: 123 }];
        expectedResult = service.addCombosToCollectionIfMissing(combosCollection, ...combosArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const combos: ICombos = { id: 123 };
        const combos2: ICombos = { id: 456 };
        expectedResult = service.addCombosToCollectionIfMissing([], combos, combos2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(combos);
        expect(expectedResult).toContain(combos2);
      });

      it('should accept null and undefined values', () => {
        const combos: ICombos = { id: 123 };
        expectedResult = service.addCombosToCollectionIfMissing([], null, combos, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(combos);
      });

      it('should return initial array if no Combos is added', () => {
        const combosCollection: ICombos[] = [{ id: 123 }];
        expectedResult = service.addCombosToCollectionIfMissing(combosCollection, undefined, null);
        expect(expectedResult).toEqual(combosCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
