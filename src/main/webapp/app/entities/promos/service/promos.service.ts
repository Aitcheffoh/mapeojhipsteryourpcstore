import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPromos, getPromosIdentifier } from '../promos.model';

export type EntityResponseType = HttpResponse<IPromos>;
export type EntityArrayResponseType = HttpResponse<IPromos[]>;

@Injectable({ providedIn: 'root' })
export class PromosService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/promos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(promos: IPromos): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(promos);
    return this.http
      .post<IPromos>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(promos: IPromos): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(promos);
    return this.http
      .put<IPromos>(`${this.resourceUrl}/${getPromosIdentifier(promos) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(promos: IPromos): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(promos);
    return this.http
      .patch<IPromos>(`${this.resourceUrl}/${getPromosIdentifier(promos) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPromos>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPromos[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPromosToCollectionIfMissing(promosCollection: IPromos[], ...promosToCheck: (IPromos | null | undefined)[]): IPromos[] {
    const promos: IPromos[] = promosToCheck.filter(isPresent);
    if (promos.length > 0) {
      const promosCollectionIdentifiers = promosCollection.map(promosItem => getPromosIdentifier(promosItem)!);
      const promosToAdd = promos.filter(promosItem => {
        const promosIdentifier = getPromosIdentifier(promosItem);
        if (promosIdentifier == null || promosCollectionIdentifiers.includes(promosIdentifier)) {
          return false;
        }
        promosCollectionIdentifiers.push(promosIdentifier);
        return true;
      });
      return [...promosToAdd, ...promosCollection];
    }
    return promosCollection;
  }

  protected convertDateFromClient(promos: IPromos): IPromos {
    return Object.assign({}, promos, {
      dateStart: promos.dateStart?.isValid() ? promos.dateStart.format(DATE_FORMAT) : undefined,
      dateEnd: promos.dateEnd?.isValid() ? promos.dateEnd.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateStart = res.body.dateStart ? dayjs(res.body.dateStart) : undefined;
      res.body.dateEnd = res.body.dateEnd ? dayjs(res.body.dateEnd) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((promos: IPromos) => {
        promos.dateStart = promos.dateStart ? dayjs(promos.dateStart) : undefined;
        promos.dateEnd = promos.dateEnd ? dayjs(promos.dateEnd) : undefined;
      });
    }
    return res;
  }
}
