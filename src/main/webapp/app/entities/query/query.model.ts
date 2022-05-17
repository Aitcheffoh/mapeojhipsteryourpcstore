import dayjs from 'dayjs/esm';
import { ICustomer } from 'app/entities/customer/customer.model';
import { IProduct } from 'app/entities/product/product.model';

export interface IQuery {
  id?: number;
  price?: number;
  dateQuery?: dayjs.Dayjs;
  customer?: ICustomer | null;
  product?: IProduct | null;
  consultant?: ICustomer | null;
  queryList?: IProduct | null;
}

export class Query implements IQuery {
  constructor(
    public id?: number,
    public price?: number,
    public dateQuery?: dayjs.Dayjs,
    public customer?: ICustomer | null,
    public product?: IProduct | null,
    public consultant?: ICustomer | null,
    public queryList?: IProduct | null
  ) {}
}

export function getQueryIdentifier(query: IQuery): number | undefined {
  return query.id;
}
