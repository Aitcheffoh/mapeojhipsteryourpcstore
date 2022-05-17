import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPromos, Promos } from '../promos.model';
import { PromosService } from '../service/promos.service';

@Injectable({ providedIn: 'root' })
export class PromosRoutingResolveService implements Resolve<IPromos> {
  constructor(protected service: PromosService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPromos> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((promos: HttpResponse<Promos>) => {
          if (promos.body) {
            return of(promos.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Promos());
  }
}
