import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRol } from '../rol.model';

@Component({
  selector: 'ceet-rol-detail',
  templateUrl: './rol-detail.component.html',
})
export class RolDetailComponent implements OnInit {
  rol: IRol | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rol }) => {
      this.rol = rol;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
