import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IRol, Rol } from '../rol.model';
import { RolService } from '../service/rol.service';

@Component({
  selector: 'ceet-rol-update',
  templateUrl: './rol-update.component.html',
})
export class RolUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    roleName: [null, [Validators.required, Validators.maxLength(10)]],
  });

  constructor(protected rolService: RolService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rol }) => {
      this.updateForm(rol);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const rol = this.createFromForm();
    if (rol.id !== undefined) {
      this.subscribeToSaveResponse(this.rolService.update(rol));
    } else {
      this.subscribeToSaveResponse(this.rolService.create(rol));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRol>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(rol: IRol): void {
    this.editForm.patchValue({
      id: rol.id,
      roleName: rol.roleName,
    });
  }

  protected createFromForm(): IRol {
    return {
      ...new Rol(),
      id: this.editForm.get(['id'])!.value,
      roleName: this.editForm.get(['roleName'])!.value,
    };
  }
}
