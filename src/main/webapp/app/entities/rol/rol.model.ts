import { ICustomer } from 'app/entities/customer/customer.model';

export interface IRol {
  id?: number;
  roleName?: string;
  roleNames?: ICustomer[] | null;
}

export class Rol implements IRol {
  constructor(public id?: number, public roleName?: string, public roleNames?: ICustomer[] | null) {}
}

export function getRolIdentifier(rol: IRol): number | undefined {
  return rol.id;
}
