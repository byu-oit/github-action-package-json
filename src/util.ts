export type TypeGuard<T = unknown> = (value: unknown) => value is T

export const isString: TypeGuard<string> = (value): value is string => {
  return typeof value === 'string'
}

export const isEnoentError: TypeGuard<'ENOENT'> = (value): value is 'ENOENT' => {
  return isString(value) && value === 'ENOENT'
}

export function hasProperty<K extends string, T> (obj: unknown, key: K, guard?: TypeGuard<T>): obj is { [P in K]: T } {
  return obj != null && typeof obj === 'object' && Object.hasOwnProperty.call(obj, key) && (guard == null || guard((obj as Record<string, unknown>)[key]))
}

export function errorMessage (e: unknown): string {
  return hasProperty(e, 'message', isString)
    ? e.message
    : 'An unknown error occurred.'
}

export function syntaxErrorMessage (e: unknown, message?: string): string | undefined {
  if (e instanceof SyntaxError) {
    return message ?? `Mal-formatted package.json: ${e.message}.`
  }
}

export function enoentErrorMessage (e: unknown, message?: string): string | undefined {
  if (hasProperty(e, 'code', isEnoentError)) {
    return message ?? 'No package.json found.'
  }
}
