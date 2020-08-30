export interface IResult<T = Record<string, unknown>> {
  status: 'OK' | 'NOT OK';
  error?: string;
  result: T | T[];
}
