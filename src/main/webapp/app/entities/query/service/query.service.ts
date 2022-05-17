import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IQuery, getQueryIdentifier } from '../query.model';

export type EntityResponseType = HttpResponse<IQuery>;
export type EntityArrayResponseType = HttpResponse<IQuery[]>;

@Injectable({ providedIn: 'root' })
export class QueryService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/queries');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(query: IQuery): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(query);
    return this.http
      .post<IQuery>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(query: IQuery): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(query);
    return this.http
      .put<IQuery>(`${this.resourceUrl}/${getQueryIdentifier(query) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(query: IQuery): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(query);
    return this.http
      .patch<IQuery>(`${this.resourceUrl}/${getQueryIdentifier(query) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IQuery>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IQuery[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addQueryToCollectionIfMissing(queryCollection: IQuery[], ...queriesToCheck: (IQuery | null | undefined)[]): IQuery[] {
    const queries: IQuery[] = queriesToCheck.filter(isPresent);
    if (queries.length > 0) {
      const queryCollectionIdentifiers = queryCollection.map(queryItem => getQueryIdentifier(queryItem)!);
      const queriesToAdd = queries.filter(queryItem => {
        const queryIdentifier = getQueryIdentifier(queryItem);
        if (queryIdentifier == null || queryCollectionIdentifiers.includes(queryIdentifier)) {
          return false;
        }
        queryCollectionIdentifiers.push(queryIdentifier);
        return true;
      });
      return [...queriesToAdd, ...queryCollection];
    }
    return queryCollection;
  }

  protected convertDateFromClient(query: IQuery): IQuery {
    return Object.assign({}, query, {
      dateQuery: query.dateQuery?.isValid() ? query.dateQuery.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateQuery = res.body.dateQuery ? dayjs(res.body.dateQuery) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((query: IQuery) => {
        query.dateQuery = query.dateQuery ? dayjs(query.dateQuery) : undefined;
      });
    }
    return res;
  }
}
