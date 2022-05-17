import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RolComponent } from './list/rol.component';
import { RolDetailComponent } from './detail/rol-detail.component';
import { RolUpdateComponent } from './update/rol-update.component';
import { RolDeleteDialogComponent } from './delete/rol-delete-dialog.component';
import { RolRoutingModule } from './route/rol-routing.module';

@NgModule({
  imports: [SharedModule, RolRoutingModule],
  declarations: [RolComponent, RolDetailComponent, RolUpdateComponent, RolDeleteDialogComponent],
  entryComponents: [RolDeleteDialogComponent],
})
export class RolModule {}
