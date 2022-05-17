import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPromos } from '../promos.model';
import { PromosService } from '../service/promos.service';
import { PromosDeleteDialogComponent } from '../delete/promos-delete-dialog.component';

@Component({
  selector: 'ceet-promos',
  templateUrl: './promos.component.html',
})
export class PromosComponent implements OnInit {
  promos?: IPromos[];
  isLoading = false;

  constructor(protected promosService: PromosService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.promosService.query().subscribe({
      next: (res: HttpResponse<IPromos[]>) => {
        this.isLoading = false;
        this.promos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IPromos): number {
    return item.id!;
  }

  delete(promos: IPromos): void {
    const modalRef = this.modalService.open(PromosDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.promos = promos;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
