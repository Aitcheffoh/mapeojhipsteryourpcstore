import { IProduct } from 'app/entities/product/product.model';
import { IShop } from 'app/entities/shop/shop.model';

export interface IDealer {
  id?: number;
  nameDealer?: string;
  products?: IProduct[] | null;
  shop?: IShop | null;
  dealerList?: IShop | null;
  productDealers?: IProduct[] | null;
}

export class Dealer implements IDealer {
  constructor(
    public id?: number,
    public nameDealer?: string,
    public products?: IProduct[] | null,
    public shop?: IShop | null,
    public dealerList?: IShop | null,
    public productDealers?: IProduct[] | null
  ) {}
}

export function getDealerIdentifier(dealer: IDealer): number | undefined {
  return dealer.id;
}
