import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICombos } from '../combos.model';

@Component({
  selector: 'ceet-combos-detail',
  templateUrl: './combos-detail.component.html',
})
export class CombosDetailComponent implements OnInit {
  combos: ICombos | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ combos }) => {
      this.combos = combos;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
