import { z } from 'zod';
import { faker } from '@faker-js/faker';

/**
 * Represents an order in the contract calculator
 * @interface Order
 */
export interface Order {
  /** Unique identifier for the order */
  id: string;
  /** Name or description of the order */
  name: string;
  /** Height of the order item in millimeters */
  height: number;
  /** Width of the order item in millimeters */
  width: number;
}

/**
 * Zod schema for validating order data
 * @constant OrderSchema
 */
export const OrderSchema = z.object({
  /** Generates a random UUID if not provided */
  id: z.string().default(faker.string.uuid()).optional(),
  /** Name must not be empty */
  name: z.string().min(1, 'Name is required'),
  /** Converts string input to number for height */
  height: z.string().transform((str: string) => {
    const value = parseFloat(str);
    if (isNaN(value)) throw new Error('Height must be a valid number');
    if (value <= 0) throw new Error('Height must be greater than 0');
    return value;
  }),
  /** Converts string input to number for width */
  width: z.string().transform((str: string) => {
    const value = parseFloat(str);
    if (isNaN(value)) throw new Error('Width must be a valid number');
    if (value <= 0) throw new Error('Width must be greater than 0');
    return value;
  })
});

/**
 * Type representing the inferred shape of the OrderSchema
 */
export type OrderInput = z.infer<typeof OrderSchema>;
