import { ISale } from 'app/entities/sale/sale.model';
import { IDealer } from 'app/entities/dealer/dealer.model';

export interface IShop {
  id?: number;
  nameShop?: string;
  place?: string;
  phoneShop?: number;
  sales?: ISale[] | null;
  dealers?: IDealer[] | null;
  shopSales?: ISale[] | null;
  shopDealers?: IDealer[] | null;
}

export class Shop implements IShop {
  constructor(
    public id?: number,
    public nameShop?: string,
    public place?: string,
    public phoneShop?: number,
    public sales?: ISale[] | null,
    public dealers?: IDealer[] | null,
    public shopSales?: ISale[] | null,
    public shopDealers?: IDealer[] | null
  ) {}
}

export function getShopIdentifier(shop: IShop): number | undefined {
  return shop.id;
}
