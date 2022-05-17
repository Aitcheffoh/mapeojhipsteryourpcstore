import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRol, Rol } from '../rol.model';
import { RolService } from '../service/rol.service';

@Injectable({ providedIn: 'root' })
export class RolRoutingResolveService implements Resolve<IRol> {
  constructor(protected service: RolService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRol> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((rol: HttpResponse<Rol>) => {
          if (rol.body) {
            return of(rol.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Rol());
  }
}
