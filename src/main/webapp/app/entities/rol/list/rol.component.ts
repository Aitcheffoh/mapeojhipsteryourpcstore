import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRol } from '../rol.model';
import { RolService } from '../service/rol.service';
import { RolDeleteDialogComponent } from '../delete/rol-delete-dialog.component';

@Component({
  selector: 'ceet-rol',
  templateUrl: './rol.component.html',
})
export class RolComponent implements OnInit {
  rols?: IRol[];
  isLoading = false;

  constructor(protected rolService: RolService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.rolService.query().subscribe({
      next: (res: HttpResponse<IRol[]>) => {
        this.isLoading = false;
        this.rols = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IRol): number {
    return item.id!;
  }

  delete(rol: IRol): void {
    const modalRef = this.modalService.open(RolDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.rol = rol;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
