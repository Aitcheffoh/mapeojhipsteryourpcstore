import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PromosComponent } from '../list/promos.component';
import { PromosDetailComponent } from '../detail/promos-detail.component';
import { PromosUpdateComponent } from '../update/promos-update.component';
import { PromosRoutingResolveService } from './promos-routing-resolve.service';

const promosRoute: Routes = [
  {
    path: '',
    component: PromosComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PromosDetailComponent,
    resolve: {
      promos: PromosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PromosUpdateComponent,
    resolve: {
      promos: PromosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PromosUpdateComponent,
    resolve: {
      promos: PromosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(promosRoute)],
  exports: [RouterModule],
})
export class PromosRoutingModule {}
