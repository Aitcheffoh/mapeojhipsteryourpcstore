import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { QueryComponent } from '../list/query.component';
import { QueryDetailComponent } from '../detail/query-detail.component';
import { QueryUpdateComponent } from '../update/query-update.component';
import { QueryRoutingResolveService } from './query-routing-resolve.service';

const queryRoute: Routes = [
  {
    path: '',
    component: QueryComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: QueryDetailComponent,
    resolve: {
      query: QueryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: QueryUpdateComponent,
    resolve: {
      query: QueryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: QueryUpdateComponent,
    resolve: {
      query: QueryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(queryRoute)],
  exports: [RouterModule],
})
export class QueryRoutingModule {}
