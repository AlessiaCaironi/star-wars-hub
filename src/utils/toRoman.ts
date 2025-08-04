/**
 * Converts an Arabic number to its Roman numeral representation.
 *
 * @param num - The number to convert (must be a positive integer).
 * @returns A string representing the Roman numeral equivalent.
 *
 * @example
 * toRoman(4); // "IV"
 */
export function toRoman(num: number): string {
  if (!Number.isInteger(num) || num <= 0) {
    console.error('Invalid input: num must be a positive integer.')
    return ''
  }

  const romanMap: [number, string][] = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ]

  let result = ''

  for (const [value, symbol] of romanMap) {
    while (num >= value) {
      result += symbol
      num -= value
    }
  }

  return result
}
