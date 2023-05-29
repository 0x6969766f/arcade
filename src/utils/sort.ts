// @ts-nocheck
import naturalCompare from 'natural-compare-lite';

export const naturalSorter =
  (property: string, caseSensitive?: boolean) => (a: unknown, b: unknown) => {
    const aValue = a[property];
    const bValue = b[property];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      if (caseSensitive) {
        return naturalCompare(aValue, bValue);
      }
      return naturalCompare(aValue.toLowerCase(), bValue.toLowerCase());
    }

    if (aValue > bValue) return 1;
    if (bValue > aValue) return -1;
    return 0;
  };
