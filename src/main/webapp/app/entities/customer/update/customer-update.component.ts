import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICustomer, Customer } from '../customer.model';
import { CustomerService } from '../service/customer.service';
import { IRol } from 'app/entities/rol/rol.model';
import { RolService } from 'app/entities/rol/service/rol.service';
import { Sex } from 'app/entities/enumerations/sex.model';
import { State } from 'app/entities/enumerations/state.model';

@Component({
  selector: 'ceet-customer-update',
  templateUrl: './customer-update.component.html',
})
export class CustomerUpdateComponent implements OnInit {
  isSaving = false;
  sexValues = Object.keys(Sex);
  stateValues = Object.keys(State);

  rolsSharedCollection: IRol[] = [];

  editForm = this.fb.group({
    id: [],
    names: [null, [Validators.required, Validators.maxLength(45)]],
    lastNames: [null, [Validators.required, Validators.maxLength(45)]],
    email: [null, [Validators.required, Validators.maxLength(45)]],
    password: [null, [Validators.required, Validators.maxLength(45)]],
    phone: [null, [Validators.required]],
    celphone: [null, [Validators.required]],
    date: [null, [Validators.required]],
    sexType: [null, [Validators.required]],
    state: [null, [Validators.required]],
    rol: [],
  });

  constructor(
    protected customerService: CustomerService,
    protected rolService: RolService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customer }) => {
      this.updateForm(customer);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const customer = this.createFromForm();
    if (customer.id !== undefined) {
      this.subscribeToSaveResponse(this.customerService.update(customer));
    } else {
      this.subscribeToSaveResponse(this.customerService.create(customer));
    }
  }

  trackRolById(_index: number, item: IRol): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomer>>): void {
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

  protected updateForm(customer: ICustomer): void {
    this.editForm.patchValue({
      id: customer.id,
      names: customer.names,
      lastNames: customer.lastNames,
      email: customer.email,
      password: customer.password,
      phone: customer.phone,
      celphone: customer.celphone,
      date: customer.date,
      sexType: customer.sexType,
      state: customer.state,
      rol: customer.rol,
    });

    this.rolsSharedCollection = this.rolService.addRolToCollectionIfMissing(this.rolsSharedCollection, customer.rol);
  }

  protected loadRelationshipsOptions(): void {
    this.rolService
      .query()
      .pipe(map((res: HttpResponse<IRol[]>) => res.body ?? []))
      .pipe(map((rols: IRol[]) => this.rolService.addRolToCollectionIfMissing(rols, this.editForm.get('rol')!.value)))
      .subscribe((rols: IRol[]) => (this.rolsSharedCollection = rols));
  }

  protected createFromForm(): ICustomer {
    return {
      ...new Customer(),
      id: this.editForm.get(['id'])!.value,
      names: this.editForm.get(['names'])!.value,
      lastNames: this.editForm.get(['lastNames'])!.value,
      email: this.editForm.get(['email'])!.value,
      password: this.editForm.get(['password'])!.value,
      phone: this.editForm.get(['phone'])!.value,
      celphone: this.editForm.get(['celphone'])!.value,
      date: this.editForm.get(['date'])!.value,
      sexType: this.editForm.get(['sexType'])!.value,
      state: this.editForm.get(['state'])!.value,
      rol: this.editForm.get(['rol'])!.value,
    };
  }
}
