import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CombosComponent } from '../list/combos.component';
import { CombosDetailComponent } from '../detail/combos-detail.component';
import { CombosUpdateComponent } from '../update/combos-update.component';
import { CombosRoutingResolveService } from './combos-routing-resolve.service';

const combosRoute: Routes = [
  {
    path: '',
    component: CombosComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CombosDetailComponent,
    resolve: {
      combos: CombosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CombosUpdateComponent,
    resolve: {
      combos: CombosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CombosUpdateComponent,
    resolve: {
      combos: CombosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(combosRoute)],
  exports: [RouterModule],
})
export class CombosRoutingModule {}
