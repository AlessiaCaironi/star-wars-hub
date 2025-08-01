export const buildPath = (
  path: string,
  params: Record<string, string | number>,
): string => {
  return Object.entries(params).reduce(
    (acc, [key, value]) =>
      acc.replace(`:${key}`, encodeURIComponent(String(value))),
    path,
  )
}
