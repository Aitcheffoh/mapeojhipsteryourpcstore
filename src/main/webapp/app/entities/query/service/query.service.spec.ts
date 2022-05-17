import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IQuery, Query } from '../query.model';

import { QueryService } from './query.service';

describe('Query Service', () => {
  let service: QueryService;
  let httpMock: HttpTestingController;
  let elemDefault: IQuery;
  let expectedResult: IQuery | IQuery[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(QueryService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      price: 0,
      dateQuery: currentDate,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          dateQuery: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Query', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          dateQuery: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateQuery: currentDate,
        },
        returnedFromService
      );

      service.create(new Query()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Query', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          price: 1,
          dateQuery: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateQuery: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Query', () => {
      const patchObject = Object.assign(
        {
          price: 1,
          dateQuery: currentDate.format(DATE_FORMAT),
        },
        new Query()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          dateQuery: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Query', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          price: 1,
          dateQuery: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateQuery: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Query', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addQueryToCollectionIfMissing', () => {
      it('should add a Query to an empty array', () => {
        const query: IQuery = { id: 123 };
        expectedResult = service.addQueryToCollectionIfMissing([], query);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(query);
      });

      it('should not add a Query to an array that contains it', () => {
        const query: IQuery = { id: 123 };
        const queryCollection: IQuery[] = [
          {
            ...query,
          },
          { id: 456 },
        ];
        expectedResult = service.addQueryToCollectionIfMissing(queryCollection, query);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Query to an array that doesn't contain it", () => {
        const query: IQuery = { id: 123 };
        const queryCollection: IQuery[] = [{ id: 456 }];
        expectedResult = service.addQueryToCollectionIfMissing(queryCollection, query);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(query);
      });

      it('should add only unique Query to an array', () => {
        const queryArray: IQuery[] = [{ id: 123 }, { id: 456 }, { id: 72198 }];
        const queryCollection: IQuery[] = [{ id: 123 }];
        expectedResult = service.addQueryToCollectionIfMissing(queryCollection, ...queryArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const query: IQuery = { id: 123 };
        const query2: IQuery = { id: 456 };
        expectedResult = service.addQueryToCollectionIfMissing([], query, query2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(query);
        expect(expectedResult).toContain(query2);
      });

      it('should accept null and undefined values', () => {
        const query: IQuery = { id: 123 };
        expectedResult = service.addQueryToCollectionIfMissing([], null, query, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(query);
      });

      it('should return initial array if no Query is added', () => {
        const queryCollection: IQuery[] = [{ id: 123 }];
        expectedResult = service.addQueryToCollectionIfMissing(queryCollection, undefined, null);
        expect(expectedResult).toEqual(queryCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
