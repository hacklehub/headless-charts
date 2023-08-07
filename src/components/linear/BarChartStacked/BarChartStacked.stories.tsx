/* eslint-disable @typescript-eslint/no-explicit-any */
import BarChartStacked from '.';
import { Meta } from '@storybook/react';
import data from './sample.json';

export default {
  title: 'Linear/BarChartStacked',
  component: BarChartStacked,
  tags: ['autodocs'],
} as Meta;

export const Default = {
  args: {
    data,
    id: 'bar-chart-stacked-default',
    x: [
      {
        key: 'reading',
      },
      { key: 'value' },
    ],
    y: { key: 'name' },
  },
};

export const Styled = {
  args: {
    ...Default.args,
    id: 'bar-chart-stacked-styled',
    className: 'bg-gray-100 rounded',
    padding: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 5,
      bar: 0.1,
    },
    margin: {
      top: 0,
      right: 40,
      bottom: 40,
      left: 60,
    },
    x: [
      {
        key: 'reading',
        className: 'fill-purple-700',
      },
      { key: 'value', className: 'fill-purple-400' },
    ],
    y: { key: 'name', className: 'text-red-500', padding: 10 },
  },
};

export const Tooltip = {
  args: {
    ...Styled.args,
    id: 'bar-chart-stacked-tooltip',
    tooltip: {
      className: 'bg-gray-800 text-white p-2 rounded',
      keys: ['name', 'reading', 'value'],
    },
  },
};

export const CustomTooltip = {
  args: {
    ...Styled.args,
    id: 'bar-chart-custom-tooltip',
    tooltip: {
      className: 'bg-gray-800 text-white p-2 rounded',
      html: (d: any) => {
        return `
            <div class="flex flex-col">
              <div class="text-lg text-center">${d.name}</div>
              <div class="text-sm text-center">${d.reading}</div>
              <div class="text-sm text-center">${d.value}</div>
            </div>
          `;
      },
    },
  },
};

export const WithDrawing = {
  args: {
    ...Styled.args,
    id: 'bar-chart-stacked-drawing',
    drawing: {
      duration: 1000,
    },
  },
};

export const WithDrawingDelay = {
  args: {
    ...Styled.args,
    id: 'bar-chart-stacked-drawing-delay',
    drawing: {
      duration: 1000,
      delay: 100,
    },
  },
};
