import { faker } from '@faker-js/faker';
import { z } from 'zod';

export type OrderType = 'Folienplott' | 'Banner' | 'PVC' | 'Custom';

export const ORDER_TYPE_PRICES: Partial<Record<OrderType, number>> = {
  Folienplott: 55,
  Banner: 55,
  PVC: 65
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
  id: z.string().default(faker.string.uuid()).optional(),
  name: z.string().min(1),
  height: z.string().transform((str) => parseFloat(str)),
  width: z.string().transform((str) => parseFloat(str)),
  type: z.enum(['Folienplott', 'Banner', 'PVC', 'Custom']),
  amount: z
    .string()
    .transform((str) => parseFloat(str))
    .default('1'),
  customPrice: z
    .string()
    .transform((str) => parseFloat(str))
    .optional()
});
