import { ascending, descending, rank } from 'd3';

interface XField {
  key: string;
  [key: string]: any;
}

interface YField {
  key: string;
  className?: string;
  [key: string]: any;
}

/**
 *
 * Converting to ranks for ranked line chart
 *
 * @param data The data to convert to ranks
 * @param y The columns which need to be converted to ranks
 * @param x The label field (x axis)
 * @param increasing Is it an increasing or decreasing rank?
 * @returns
 */
const convertToRanks = (
  data: any,
  y: YField[],
  x: XField,
  increasing: boolean = false
) => {
  // @ts-ignore
  const rankedData = data.map((d) => {
    const iterable = y
      .filter((t) => d[t.key] !== undefined)
      .map((t) => [t.key, d[t.key]]);

    // @ts-ignore
    const ranks = rank(iterable, (a, b) =>
      increasing ? ascending(a[1], b[1]) : descending(a[1], b[1])
    );

    // @ts-ignore
    const entries = y.map((t, i) => [t.key, ranks[i] + 1]);
    const newObj = Object.fromEntries(entries);

    return {
      //@ts-ignore
      [x.key]: d[x.key],
      ...newObj,
    };
  });
  return rankedData;
};

export default convertToRanks;
