import BoxPlotV from '.';
import { Meta } from '@storybook/react';
import data from '../sample.json';

const meta: Meta<typeof BoxPlotV> = {
  title: 'Ranges/BoxPlotV',
  component: BoxPlotV,
  tags: ['autodocs'],
};

export default meta;

/** Default BoxPlot (Grouped). */
export const Default = {
  args: {
    data,
    id: 'box-plot-h-default',
    y: {
      minKey: 'min',
      maxKey: 'max',
      midKey: 'mid',
      boxStart: 'firstQuartile',
      boxEnd: 'lastQuartile',
      min: 0,
    },
    x: { key: 'name' },
  },
};

/** BoxPlot (Grouped) with custom colors. */
export const CustomColors = {
  args: {
    ...Default.args,
    id: 'box-plot-h-custom-colors',
    y: {
      ...Default.args.y,
      classNameBoxes: 'text-blue-500 opacity-100',
    },
  },
};

export const CustomColorMap = {
  args: {
    ...Default.args,
    id: 'box-plot-h-custom-color-map',
    y: {
      ...Default.args.y,
    },
    data: data.map((d: any, idx: number) => ({
      ...d,
      className: [
        'text-red-900',
        'text-green-900',
        'text-yellow-500',
        'text-orange-500',
      ][idx],
    })),
  },
};

export const DefaultTooltip = {
  args: {
    ...Default.args,
    id: 'box-plot-h-default-tooltip',
    tooltip: {},
  },
};

export const CustomStyleTooltip = {
  args: {
    ...Default.args,
    id: 'box-plot-h-custom-tooltip',
    tooltip: {
      className: 'bg-gray-100 text-gray-900',
    },
  },
};

export const CustomHtmlTooltip = {
  args: {
    ...Default.args,
    id: 'box-plot-h-custom-html-tooltip',
    tooltip: {
      html: (d: any) => {
        return `<div class="bg-gray-100 text-gray-900 p-2 rounded">
          <div class="text-lg font-bold">${d.name}</div>
          <div class="text-sm">${d.name} ranges between ${d.min} and ${d.max}, with an median of ${d.mid}. </div>
          <div class="text-sm">The first and last quartile values are at ${d.firstQuartile} and ${d.lastQuartile}</div>
        </div>`;
      },
    },
  },
};

export const Zooming = {
  args: {
    ...Default.args,
    id: 'box-plot-h-zooming',
    zooming: {
      enabled: true,
      min: 0.75,
      max: 2,
    },
  },
};
