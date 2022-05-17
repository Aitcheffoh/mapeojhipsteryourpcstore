import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IRol } from '../rol.model';
import { RolService } from '../service/rol.service';

@Component({
  templateUrl: './rol-delete-dialog.component.html',
})
export class RolDeleteDialogComponent {
  rol?: IRol;

  constructor(protected rolService: RolService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.rolService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
