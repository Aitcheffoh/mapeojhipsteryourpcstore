import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICombos } from '../combos.model';
import { CombosService } from '../service/combos.service';
import { CombosDeleteDialogComponent } from '../delete/combos-delete-dialog.component';

@Component({
  selector: 'ceet-combos',
  templateUrl: './combos.component.html',
})
export class CombosComponent implements OnInit {
  combos?: ICombos[];
  isLoading = false;

  constructor(protected combosService: CombosService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.combosService.query().subscribe({
      next: (res: HttpResponse<ICombos[]>) => {
        this.isLoading = false;
        this.combos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: ICombos): number {
    return item.id!;
  }

  delete(combos: ICombos): void {
    const modalRef = this.modalService.open(CombosDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.combos = combos;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
