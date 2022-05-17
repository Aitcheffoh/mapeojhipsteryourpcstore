import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPromos } from '../promos.model';

@Component({
  selector: 'ceet-promos-detail',
  templateUrl: './promos-detail.component.html',
})
export class PromosDetailComponent implements OnInit {
  promos: IPromos | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ promos }) => {
      this.promos = promos;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
