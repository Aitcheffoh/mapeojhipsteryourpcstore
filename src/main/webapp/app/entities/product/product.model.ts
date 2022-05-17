import { ISale } from 'app/entities/sale/sale.model';
import { ICombos } from 'app/entities/combos/combos.model';
import { IPromos } from 'app/entities/promos/promos.model';
import { IQuery } from 'app/entities/query/query.model';
import { IDealer } from 'app/entities/dealer/dealer.model';

export interface IProduct {
  id?: number;
  nameProduct?: string;
  price?: number;
  sales?: ISale[] | null;
  combos?: ICombos[] | null;
  promos?: IPromos[] | null;
  queries?: IQuery[] | null;
  dealer?: IDealer | null;
  productList?: IDealer | null;
  productSales?: ISale[] | null;
  queryProducts?: IQuery[] | null;
  promosProducts?: IPromos[] | null;
  combosProducts?: ICombos[] | null;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public nameProduct?: string,
    public price?: number,
    public sales?: ISale[] | null,
    public combos?: ICombos[] | null,
    public promos?: IPromos[] | null,
    public queries?: IQuery[] | null,
    public dealer?: IDealer | null,
    public productList?: IDealer | null,
    public productSales?: ISale[] | null,
    public queryProducts?: IQuery[] | null,
    public promosProducts?: IPromos[] | null,
    public combosProducts?: ICombos[] | null
  ) {}
}

export function getProductIdentifier(product: IProduct): number | undefined {
  return product.id;
}
