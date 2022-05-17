import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDealer } from '../dealer.model';
import { DealerService } from '../service/dealer.service';
import { DealerDeleteDialogComponent } from '../delete/dealer-delete-dialog.component';

@Component({
  selector: 'ceet-dealer',
  templateUrl: './dealer.component.html',
})
export class DealerComponent implements OnInit {
  dealers?: IDealer[];
  isLoading = false;

  constructor(protected dealerService: DealerService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.dealerService.query().subscribe({
      next: (res: HttpResponse<IDealer[]>) => {
        this.isLoading = false;
        this.dealers = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IDealer): number {
    return item.id!;
  }

  delete(dealer: IDealer): void {
    const modalRef = this.modalService.open(DealerDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.dealer = dealer;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
