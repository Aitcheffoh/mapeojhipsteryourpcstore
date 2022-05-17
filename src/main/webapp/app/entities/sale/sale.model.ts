import dayjs from 'dayjs/esm';
import { ICustomer } from 'app/entities/customer/customer.model';
import { IProduct } from 'app/entities/product/product.model';
import { IShop } from 'app/entities/shop/shop.model';

export interface ISale {
  id?: number;
  dateSale?: dayjs.Dayjs;
  valueSale?: number;
  customer?: ICustomer | null;
  product?: IProduct | null;
  shop?: IShop | null;
  shopper?: ICustomer | null;
  saleList?: IProduct | null;
  listSale?: IShop | null;
}

export class Sale implements ISale {
  constructor(
    public id?: number,
    public dateSale?: dayjs.Dayjs,
    public valueSale?: number,
    public customer?: ICustomer | null,
    public product?: IProduct | null,
    public shop?: IShop | null,
    public shopper?: ICustomer | null,
    public saleList?: IProduct | null,
    public listSale?: IShop | null
  ) {}
}

export function getSaleIdentifier(sale: ISale): number | undefined {
  return sale.id;
}
