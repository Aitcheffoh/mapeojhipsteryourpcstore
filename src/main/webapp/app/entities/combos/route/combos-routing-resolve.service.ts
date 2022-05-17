import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICombos, Combos } from '../combos.model';
import { CombosService } from '../service/combos.service';

@Injectable({ providedIn: 'root' })
export class CombosRoutingResolveService implements Resolve<ICombos> {
  constructor(protected service: CombosService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICombos> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((combos: HttpResponse<Combos>) => {
          if (combos.body) {
            return of(combos.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Combos());
  }
}
