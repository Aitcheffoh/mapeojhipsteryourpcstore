import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PromosComponent } from './list/promos.component';
import { PromosDetailComponent } from './detail/promos-detail.component';
import { PromosUpdateComponent } from './update/promos-update.component';
import { PromosDeleteDialogComponent } from './delete/promos-delete-dialog.component';
import { PromosRoutingModule } from './route/promos-routing.module';

@NgModule({
  imports: [SharedModule, PromosRoutingModule],
  declarations: [PromosComponent, PromosDetailComponent, PromosUpdateComponent, PromosDeleteDialogComponent],
  entryComponents: [PromosDeleteDialogComponent],
})
export class PromosModule {}
