import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IQuery, Query } from '../query.model';
import { QueryService } from '../service/query.service';

@Injectable({ providedIn: 'root' })
export class QueryRoutingResolveService implements Resolve<IQuery> {
  constructor(protected service: QueryService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IQuery> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((query: HttpResponse<Query>) => {
          if (query.body) {
            return of(query.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Query());
  }
}
