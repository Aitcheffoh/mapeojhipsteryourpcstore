import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDealer, getDealerIdentifier } from '../dealer.model';

export type EntityResponseType = HttpResponse<IDealer>;
export type EntityArrayResponseType = HttpResponse<IDealer[]>;

@Injectable({ providedIn: 'root' })
export class DealerService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/dealers');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(dealer: IDealer): Observable<EntityResponseType> {
    return this.http.post<IDealer>(this.resourceUrl, dealer, { observe: 'response' });
  }

  update(dealer: IDealer): Observable<EntityResponseType> {
    return this.http.put<IDealer>(`${this.resourceUrl}/${getDealerIdentifier(dealer) as number}`, dealer, { observe: 'response' });
  }

  partialUpdate(dealer: IDealer): Observable<EntityResponseType> {
    return this.http.patch<IDealer>(`${this.resourceUrl}/${getDealerIdentifier(dealer) as number}`, dealer, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDealer>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDealer[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDealerToCollectionIfMissing(dealerCollection: IDealer[], ...dealersToCheck: (IDealer | null | undefined)[]): IDealer[] {
    const dealers: IDealer[] = dealersToCheck.filter(isPresent);
    if (dealers.length > 0) {
      const dealerCollectionIdentifiers = dealerCollection.map(dealerItem => getDealerIdentifier(dealerItem)!);
      const dealersToAdd = dealers.filter(dealerItem => {
        const dealerIdentifier = getDealerIdentifier(dealerItem);
        if (dealerIdentifier == null || dealerCollectionIdentifiers.includes(dealerIdentifier)) {
          return false;
        }
        dealerCollectionIdentifiers.push(dealerIdentifier);
        return true;
      });
      return [...dealersToAdd, ...dealerCollection];
    }
    return dealerCollection;
  }
}
