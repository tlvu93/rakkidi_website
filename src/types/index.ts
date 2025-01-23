/**
 * Re-export all types from their respective modules
 * This provides a centralized import point for all types
 */

export * from './contract-calculator';
export * from './ui';

/**
 * Common type utilities
 */

/** Makes all properties in T optional recursively */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/** Extracts the type of an array element */
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

/** Makes specified properties in T required */
export type RequiredProps<T, K extends keyof T> = T & Required<Pick<T, K>>;

/** Makes specified properties in T optional */
export type OptionalProps<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;
