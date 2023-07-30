/* eslint-disable @typescript-eslint/no-explicit-any */
import BarChart from '.';
import { Meta } from '@storybook/react';
import data from './sample.json';

/**
 * Bar charts are used to compare values across categories by using horizontal bars.  Bar charts are useful for showing data changes over a period of time or for comparing data among items. 
 * 
 * To create a bar chart, use the `<BarChart />` component. 
 * 
 * */
export default {
  title: 'Linear/BarChart',
  component: BarChart,
  tags: ['autodocs'],
} as Meta;

/** Default Bar Chart (Grouped). */
export const Default = {
  args: {
    data,
    id: 'bar-chart-default',
    x: [
      {
        key: 'reading',
      },
      { key: 'value' },
    ],
    y: { key: 'name' },
  },
};

/** Styled bar charts (padding, margin, classNames) */
export const Styled = {
  args: {
    ...Default.args,
    id: 'bar-chart-styled',
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
        className: 'fill-red-500 rounded',
      },
      { key: 'value', className: 'fill-blue-500' },
    ],
    y: { key: 'name', className: 'text-red-500', padding: 10 },
  },
};

export const NegativeStyling = {
  args: {
    ...Default.args,
    id: 'bar-chart-negative-styling',
    x: [
      {
        key: 'reading',
        className: 'text-red-500 rounded',
        classNameNegative: 'text-green-500 rounded',
      },
      { key: 'value', className: 'text-blue-500' },
    ],
    data: [...data, { name: 'Negative', reading: -20, value: -1 }],
  },
};

export const Drawing = {
  args: {
    ...Default.args,
    id: 'bar-chart-drawing',
    drawing: {
      enabled: true,
      duration: 1000,
      delay: 100,
    },
  },
};

export const DataLabel = {
  args: {
    ...Default.args,
    id: 'bar-chart-data-label',
    dataLabel: {
      className: 'text-white',
    },
  },
};

export const Tooltip = {
  args: {
    ...Default.args,
    id: 'bar-chart-tooltip',
    tooltip: {
      className: 'bg-gray-800 text-white p-2 rounded',
      keys: ['name', 'reading', 'value'],
    },
  },
};

export const CustomTooltip = {
  args: {
    ...Default.args,
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

export const StyledYAxis = {
  args: {
    ...Default.args,
    id: 'bar-chart-styled-y-axis',
    y: {
      key: 'name',
      className: 'text-red-500',
    },
  },
};

export const BorderRadius = {
  args: {
    ...Default.args,
    id: 'bar-chart-border-radius',
    x: [
      {
        key: 'reading',
        className: 'text-red-500 rounded-full',
        rx: 3,
      },
      { key: 'value', className: 'text-blue-500', rx: 3 },
    ],
  },
};
