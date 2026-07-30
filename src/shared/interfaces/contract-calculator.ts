import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

export enum OrderType {
  Folienplott = 'Folienplott',
  Banner = 'Banner',
  PVC = 'PVC',
  Custom = 'Custom'
}

export const ORDER_TYPE_PRICES: Partial<Record<OrderType, number>> = {
  [OrderType.Folienplott]: 55,
  [OrderType.Banner]: 55,
  [OrderType.PVC]: 65
};

export interface Order {
  id: string;
  name: string;
  height: number;
  width: number;
  type: OrderType;
  amount: number;
  customPrice?: number;
}

export const OrderSchema = z.object({
  // A bare `.default(uuid())` is evaluated once when this module is
  // loaded, so every order parsed through the schema shared one id.
  // The thunk form generates a fresh id per parse.
  id: z
    .string()
    .default(() => uuidv4())
    .optional(),
  name: z.string().min(1),
  height: z.string().transform((str) => parseFloat(str)),
  width: z.string().transform((str) => parseFloat(str)),
  type: z.nativeEnum(OrderType),
  amount: z
    .string()
    .transform((str) => parseFloat(str))
    .default('1'),
  customPrice: z
    .string()
    .transform((str) => parseFloat(str))
    .optional()
});
