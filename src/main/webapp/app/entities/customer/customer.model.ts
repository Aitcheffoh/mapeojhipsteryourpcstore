import dayjs from 'dayjs/esm';
import { IQuery } from 'app/entities/query/query.model';
import { ISale } from 'app/entities/sale/sale.model';
import { IRol } from 'app/entities/rol/rol.model';
import { Sex } from 'app/entities/enumerations/sex.model';
import { State } from 'app/entities/enumerations/state.model';

export interface ICustomer {
  id?: number;
  names?: string;
  lastNames?: string;
  email?: string;
  password?: string;
  phone?: number;
  celphone?: number;
  date?: dayjs.Dayjs;
  sexType?: Sex;
  state?: State;
  queries?: IQuery[] | null;
  sales?: ISale[] | null;
  rol?: IRol | null;
  userSales?: ISale[] | null;
  queryUsers?: IQuery[] | null;
}

export class Customer implements ICustomer {
  constructor(
    public id?: number,
    public names?: string,
    public lastNames?: string,
    public email?: string,
    public password?: string,
    public phone?: number,
    public celphone?: number,
    public date?: dayjs.Dayjs,
    public sexType?: Sex,
    public state?: State,
    public queries?: IQuery[] | null,
    public sales?: ISale[] | null,
    public rol?: IRol | null,
    public userSales?: ISale[] | null,
    public queryUsers?: IQuery[] | null
  ) {}
}

export function getCustomerIdentifier(customer: ICustomer): number | undefined {
  return customer.id;
}
