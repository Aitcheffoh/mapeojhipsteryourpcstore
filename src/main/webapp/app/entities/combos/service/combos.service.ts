import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICombos, getCombosIdentifier } from '../combos.model';

export type EntityResponseType = HttpResponse<ICombos>;
export type EntityArrayResponseType = HttpResponse<ICombos[]>;

@Injectable({ providedIn: 'root' })
export class CombosService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/combos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(combos: ICombos): Observable<EntityResponseType> {
    return this.http.post<ICombos>(this.resourceUrl, combos, { observe: 'response' });
  }

  update(combos: ICombos): Observable<EntityResponseType> {
    return this.http.put<ICombos>(`${this.resourceUrl}/${getCombosIdentifier(combos) as number}`, combos, { observe: 'response' });
  }

  partialUpdate(combos: ICombos): Observable<EntityResponseType> {
    return this.http.patch<ICombos>(`${this.resourceUrl}/${getCombosIdentifier(combos) as number}`, combos, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICombos>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICombos[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCombosToCollectionIfMissing(combosCollection: ICombos[], ...combosToCheck: (ICombos | null | undefined)[]): ICombos[] {
    const combos: ICombos[] = combosToCheck.filter(isPresent);
    if (combos.length > 0) {
      const combosCollectionIdentifiers = combosCollection.map(combosItem => getCombosIdentifier(combosItem)!);
      const combosToAdd = combos.filter(combosItem => {
        const combosIdentifier = getCombosIdentifier(combosItem);
        if (combosIdentifier == null || combosCollectionIdentifiers.includes(combosIdentifier)) {
          return false;
        }
        combosCollectionIdentifiers.push(combosIdentifier);
        return true;
      });
      return [...combosToAdd, ...combosCollection];
    }
    return combosCollection;
  }
}
