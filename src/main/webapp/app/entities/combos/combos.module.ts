import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CombosComponent } from './list/combos.component';
import { CombosDetailComponent } from './detail/combos-detail.component';
import { CombosUpdateComponent } from './update/combos-update.component';
import { CombosDeleteDialogComponent } from './delete/combos-delete-dialog.component';
import { CombosRoutingModule } from './route/combos-routing.module';

@NgModule({
  imports: [SharedModule, CombosRoutingModule],
  declarations: [CombosComponent, CombosDetailComponent, CombosUpdateComponent, CombosDeleteDialogComponent],
  entryComponents: [CombosDeleteDialogComponent],
})
export class CombosModule {}
