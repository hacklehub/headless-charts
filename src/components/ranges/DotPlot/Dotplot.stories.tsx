import DotPlot from '.';
import { Meta } from '@storybook/react';

export default {
  title: 'Ranges/Dotplot',
  component: DotPlot,
  tags: ['autodocs'],
} as Meta;

export const Default = {
  args: {
    id: 'dot-plot-default',
    data: [
      //   { set1: 1, set2: 2, set3: 3 },
      //   { set1: 4, set2: 5, set3: 6 },
      //   { set1: 7, set2: 8, set3: 9 },
      { set1: 1 },
      { set2: 2 },
      { set3: 3 },
    ],
    shape: 'circle',
    y: {
      key: 'label',
    },
    x: {
      start: 0,
      end: 1,
      minKey: 'min',
      maxKey: 'max',
      axis: 'bottom',
      axisTicks: 454,
    },
  },
};
