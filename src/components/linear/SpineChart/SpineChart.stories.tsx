/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta } from '@storybook/react';
import SpineChart from '.';

export default {
  title: 'Linear/SpineChart',
  component: SpineChart,
  tags: ['autodocs'],
} as Meta;

export const Default = {
  args: {
    data: [
      {
        name: 'Product A',
        value2: 6,
        value3: 7,
        value4: 8,
      },
      {
        name: 'Product B',
        value2: 4,
        value3: 6,
        value4: 8,
      },
      {
        name: 'Product C',
        value2: 1,
        value3: 2,
        value4: 3,
      },
    ],
    id: 'spine-chart-default',
    y: {
      key: 'name',
    },
    x: [
      { key: 'value2', direction: 'left' },
      { key: 'value3', direction: 'right' },
      { key: 'value4', direction: 'left' },
    ],
  },
};

export const WithStyle = {
  args: {
    ...Default.args,
    id: 'spine-chart-with-style',
    x: [
      { key: 'value2', direction: 'left', className: 'fill-purple-700' },
      { key: 'value3', direction: 'right', className: 'fill-red-700' },
      { key: 'value4', direction: 'left', className: 'fill-orange-300' },
    ],
  },
};

export const WithYAxisToLeft = {
  args: {
    ...WithStyle.args,
    id: 'spine-chart-y-direction-left',
    y: {
      key: 'name',
      axis: 'left',
    },
    margin: {
      top: 20,
      bottom: 20,
      left: 70,
      right: 40,
      middle: 0,
    },
  },
};

export const YAxisRight = {
  args: {
    ...WithStyle.args,
    id: 'spine-chart-y-axis-middle',
    margin: {
      top: 20,
      bottom: 20,
      left: 40,
      right: 70,
      middle: 0,
    },
    y: {
      key: 'name',
      axis: 'right',
    },
  },
};

export const WithCustomPaddingBar = {
  args: {
    ...Default.args,
    id: 'spine-chart-with-padding-bar',
    paddingBar: 0.1,
  },
};

export const XAxisTop = {
  args: {
    ...Default.args,
    id: 'spine-chart-x-axis-top',
    x: [
      {
        key: 'value2',
        direction: 'left',
        className: 'fill-purple-700',
      },
      { key: 'value3', direction: 'right', className: 'fill-red-700' },
      { key: 'value4', direction: 'left', className: 'fill-orange-300' },
    ],
    xAxis: 'top',
  },
};

export const WithTooltip = {
  args: {
    ...Default.args,
    id: 'spine-chart-with-tooltip',
    tooltip: {
      keys: ['value2', 'value3', 'value4'],
      className: 'bg-gray-800 text-white p-2 rounded-md shadow-md',
    },
  },
};

export const WithCustomTooltip = {
  args: {
    ...Default.args,
    id: 'spine-chart-with-custom-tooltip',
    tooltip: {
      html: (d: any) => `
        <div class="bg-gray-800 text-white p-2 rounded-md shadow-md">
          <div class="font-bold">${d.name}</div>
          <div>${d.value2}</div>
          <div>${d.value3}</div>
          <div>${d.value4}</div>
        </div>
      `,
    },
  },
};
