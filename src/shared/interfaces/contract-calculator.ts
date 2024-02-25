import { z } from 'zod';
import { faker } from '@faker-js/faker';

export interface Order {
  id: string;
  name: string;
  height: number;
  width: number;
}

export const OrderSchema = z.object({
  id: z.string().default(faker.string.uuid()).optional(),
  name: z.string().min(1),
  height: z.string().transform((str) => parseFloat(str)),
  width: z.string().transform((str) => parseFloat(str))
});
