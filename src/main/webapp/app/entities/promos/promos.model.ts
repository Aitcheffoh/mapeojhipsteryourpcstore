import dayjs from 'dayjs/esm';
import { IProduct } from 'app/entities/product/product.model';

export interface IPromos {
  id?: number;
  dateStart?: dayjs.Dayjs;
  dateEnd?: dayjs.Dayjs;
  pricePromo?: number;
  product?: IProduct | null;
  promosList?: IProduct | null;
}

export class Promos implements IPromos {
  constructor(
    public id?: number,
    public dateStart?: dayjs.Dayjs,
    public dateEnd?: dayjs.Dayjs,
    public pricePromo?: number,
    public product?: IProduct | null,
    public promosList?: IProduct | null
  ) {}
}

export function getPromosIdentifier(promos: IPromos): number | undefined {
  return promos.id;
}
