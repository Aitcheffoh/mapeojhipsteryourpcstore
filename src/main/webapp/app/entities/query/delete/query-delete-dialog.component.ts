import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IQuery } from '../query.model';
import { QueryService } from '../service/query.service';

@Component({
  templateUrl: './query-delete-dialog.component.html',
})
export class QueryDeleteDialogComponent {
  query?: IQuery;

  constructor(protected queryService: QueryService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.queryService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
