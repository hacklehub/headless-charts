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

    console.log(iterable);
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
