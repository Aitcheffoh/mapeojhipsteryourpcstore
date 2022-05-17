import { IProduct } from 'app/entities/product/product.model';

export interface ICombos {
  id?: number;
  priceCombo?: number;
  product?: IProduct | null;
  comboList?: IProduct | null;
}

export class Combos implements ICombos {
  constructor(public id?: number, public priceCombo?: number, public product?: IProduct | null, public comboList?: IProduct | null) {}
}

export function getCombosIdentifier(combos: ICombos): number | undefined {
  return combos.id;
}
