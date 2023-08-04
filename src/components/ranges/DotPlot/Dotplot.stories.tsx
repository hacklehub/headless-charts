/* eslint-disable @typescript-eslint/no-explicit-any */
import DotPlot from '.';
import { Meta } from '@storybook/react';
import data from './sample.json';

export default {
  title: 'Ranges/Dotplot',
  component: DotPlot,
  tags: ['autodocs'],
} as Meta;

export const Default = {
  args: {
    id: 'dot-plot-default',
    data,

    y: {
      key: 'label',
      axis: 'left',
    },
    x: {
      minKey: 'minTemp',
      maxKey: 'maxTemp',
    },
  },
};

export const CustomShape = {
  args: {
    ...Default.args,
    id: 'dot-plot-custom-shape',
    shape: 'star',
  },
};

export const CustomTooltip = {
  args: {
    ...Default.args,
    id: 'dot-plot-custom-tooltip',
    tooltip: {
      keys: ['minTemp', 'maxTemp'],
    },
  },
};

export const CustomTooltipHtml = {
  args: {
    ...Default.args,
    id: 'dot-plot-custom-tooltip-html',
    tooltip: {
      html: (d: any) => {
        return `
          <div>
            <div>${d.label}</div>
            <div>Min: ${d.minTemp}</div>
            <div>Max: ${d.maxTemp}</div>
          </div>
        `;
      },
    },
  },
};
