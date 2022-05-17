import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'customer',
        data: { pageTitle: 'yourpcstoreApp.customer.home.title' },
        loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
      },
      {
        path: 'rol',
        data: { pageTitle: 'yourpcstoreApp.rol.home.title' },
        loadChildren: () => import('./rol/rol.module').then(m => m.RolModule),
      },
      {
        path: 'sale',
        data: { pageTitle: 'yourpcstoreApp.sale.home.title' },
        loadChildren: () => import('./sale/sale.module').then(m => m.SaleModule),
      },
      {
        path: 'query',
        data: { pageTitle: 'yourpcstoreApp.query.home.title' },
        loadChildren: () => import('./query/query.module').then(m => m.QueryModule),
      },
      {
        path: 'product',
        data: { pageTitle: 'yourpcstoreApp.product.home.title' },
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
      },
      {
        path: 'shop',
        data: { pageTitle: 'yourpcstoreApp.shop.home.title' },
        loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule),
      },
      {
        path: 'dealer',
        data: { pageTitle: 'yourpcstoreApp.dealer.home.title' },
        loadChildren: () => import('./dealer/dealer.module').then(m => m.DealerModule),
      },
      {
        path: 'promos',
        data: { pageTitle: 'yourpcstoreApp.promos.home.title' },
        loadChildren: () => import('./promos/promos.module').then(m => m.PromosModule),
      },
      {
        path: 'combos',
        data: { pageTitle: 'yourpcstoreApp.combos.home.title' },
        loadChildren: () => import('./combos/combos.module').then(m => m.CombosModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
