import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IQuery } from '../query.model';
import { QueryService } from '../service/query.service';
import { QueryDeleteDialogComponent } from '../delete/query-delete-dialog.component';

@Component({
  selector: 'ceet-query',
  templateUrl: './query.component.html',
})
export class QueryComponent implements OnInit {
  queries?: IQuery[];
  isLoading = false;

  constructor(protected queryService: QueryService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.queryService.query().subscribe({
      next: (res: HttpResponse<IQuery[]>) => {
        this.isLoading = false;
        this.queries = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IQuery): number {
    return item.id!;
  }

  delete(query: IQuery): void {
    const modalRef = this.modalService.open(QueryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.query = query;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
