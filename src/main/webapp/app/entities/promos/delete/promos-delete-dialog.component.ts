import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPromos } from '../promos.model';
import { PromosService } from '../service/promos.service';

@Component({
  templateUrl: './promos-delete-dialog.component.html',
})
export class PromosDeleteDialogComponent {
  promos?: IPromos;

  constructor(protected promosService: PromosService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.promosService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
