import type { TransformFnParams } from 'class-transformer';

/** `@Transform(trim)`: trims string input; leaves other types for the validators to reject. */
export const trim = ({ value }: TransformFnParams): unknown =>
  typeof value === 'string' ? value.trim() : value;
