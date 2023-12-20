import { Meta } from '@storybook/react';
import SpineChart from '.';
import data from '../AreaChart/data.json';

const meta: Meta<typeof SpineChart> = {
  title: 'Linear/SpineChart',
  component: SpineChart,
  tags: ['autodocs'],
};

export default meta;

export const Default = {
  args: {
    data,
    id: 'spine-chart-default',
    y: {
      key: 'year',
    },
    x: [
      { key: 'macbook', direction: 'right' },
      { key: 'iphone', direction: 'left' },
      { key: 'wearables', direction: 'right' },
      { key: 'services' },
      { key: 'ipad' },
    ],
  },
};

export const Styled = {
  args: {
    ...Default.args,
    id: 'spine-chart-with-style',
    x: [
      { key: 'macbook', className: 'fill-purple-700' },
      { key: 'iphone', direction: 'left', className: 'fill-purple-800' },
      { key: 'wearables', className: 'fill-purple-500' },
      { key: 'services', className: 'fill-purple-300' },
      { key: 'ipad', className: 'fill-purple-100' },
    ],
  },
};

export const WithYAxisToLeft = {
  args: {
    ...Styled.args,
    id: 'spine-chart-y-direction-left',
    y: {
      key: 'year',
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
    ...Styled.args,
    id: 'spine-chart-y-axis-middle',
    margin: {
      top: 20,
      bottom: 20,
      left: 40,
      right: 70,
      middle: 0,
    },
    y: {
      key: 'year',
      axis: 'right',
    },
  },
};

export const WithCustomPaddingBar = {
  args: {
    ...Styled.args,
    id: 'spine-chart-with-padding-bar',
    paddingBar: 0.1,
  },
};

export const XAxisTop = {
  args: {
    ...Styled.args,
    id: 'spine-chart-x-axis-top',
    xAxis: 'top',
  },
};

export const WithTooltip = {
  args: {
    ...Styled.args,
    id: 'spine-chart-with-custom-tooltip',
    tooltip: {},
  },
};

export const TooltipWithCustomStyle = {
  args: {
    ...Styled.args,
    id: 'spine-chart-with-tooltip-className',
    tooltip: {
      className: 'bg-gray-800 text-white p-2 rounded-md shadow-md',
    },
  },
};

export const TooltipWithCustomKeys = {
  args: {
    ...Styled.args,
    id: 'spine-chart-with-tooltip-custom-keys',
    tooltip: {
      keys: ['year', 'macbook', 'iphone', 'ipad'],
      className: 'bg-gray-800 text-white p-2 rounded-md shadow-md',
    },
  },
};

export const TooltipWithCustomHTML = {
  args: {
    ...Styled.args,
    id: 'spine-chart-with-tooltip-custom-html',
    tooltip: {
      html: (d: any) => {
        return `<div class="bg-gray-800 text-white p-2 rounded-md shadow-md">
          <div>Year: ${d.year}</div>
          <div>Macbook: ${d.macbook}</div>
          <div>iPhone: ${d.iphone}</div>
          <div>iPad: ${d.ipad}</div>
          <div>Wearables & Home: ${d.wearables}</div>
          <div>Services: ${d.services}</div>
        </div>`;
      },
    },
  },
};
