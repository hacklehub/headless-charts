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
      { label: '1', minKey: 0.2, maxKey: 0.4 },
      { label: '2', minKey: 0.2, maxKey: 0.6 },
      { label: '3', minKey: 0.4, maxKey: 0.8 },
      { label: '4', minKey: 0.6, maxKey: 1.0 },
    ],
    shape: 'star',
    y: {
      key: 'label',
      axis: "left"
    },
    x: {
      start: 0,
      end: 1,
      minKey: 0,
      maxKey: 1,
      axis: 'bottom',
      axisTicks: 5,
    },
  },
};
