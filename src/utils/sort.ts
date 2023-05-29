import naturalCompare from 'natural-compare-lite';

/**
 * .sort() compatible function with natural compare (e.g. 'foo 10' comes after 'foo 9') for objects.
 * @param property Pass in the property to sort by.
 */
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
