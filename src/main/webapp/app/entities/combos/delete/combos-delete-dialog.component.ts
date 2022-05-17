import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICombos } from '../combos.model';
import { CombosService } from '../service/combos.service';

@Component({
  templateUrl: './combos-delete-dialog.component.html',
})
export class CombosDeleteDialogComponent {
  combos?: ICombos;

  constructor(protected combosService: CombosService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.combosService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
