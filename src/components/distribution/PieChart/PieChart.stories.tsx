/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta } from '@storybook/react';
import PieChart from '.';

export default {
  title: 'Linear/PieChart',
  component: PieChart,
  tags: ['autodocs'],
} as Meta;

const classMap = {
  'Product A': 'text-purple-700',
  'Product B': 'text-purple-500',
  'Product C': 'text-purple-300',
};

export const Default = {
  args: {
    data: [
      { name: 'Product A', USA: 10000, Europe: 4000, APAC: 5000, Africa: 1000 },
      { name: 'Product B', USA: 9400, Europe: 9000, APAC: 4000 },
      { name: 'Product C', USA: 6000, Europe: 4000, APAC: 1000 },
    ],
    value: 'USA',
    id: 'default-pie-chart',
  },
};

export const Styled = {
  args: {
    ...Default.args,
    id: 'styled-pie-chart',
    classNamePoints: { classMap },
    drawing: { duration: 1000 },
    value: 'USA',
  },
};

export const Labelled = {
  args: {
    ...Styled.args,
    id: 'labelled-pie-chart',
    labels: {
      radius: 1.4,
      key: 'name',
      text: (data: any) => `${data.name} (${data['USA']})`,
      className: 'text-black',
      labelsMap: { 'Product A': 'text-purple-700' },
    },
  },
};

export const PieChartDonut = {
  args: {
    ...Styled.args,
    id: 'donut-chart',
    className: 'md:w-6/12',
    classNamePoints: { classMap },
    innerRadius: 0.7,
  },
};

export const PaddingAngle = {
  args: {
    ...Labelled.args,
    innerRadius: 0.7,
    id: 'pie-chart-padding-angle',
    paddingAngle: 0.04,
  },
};

export const CornerRadius = {
  args: {
    ...PaddingAngle.args,
    id: 'pie-chart-corner-radius',
    cornerRadius: 5,
  },
};

export const Tooltip = {
  args: {
    ...Styled.args,
    id: 'pie-chart-tooltip',
    tooltip: {
      className: 'bg-gray-800 text-white p-2 rounded',
    },
  },
};

export const TooltipWithOtherKeys = {
  args: {
    ...Styled.args,
    id: 'pie-chart-tooltip-with-other-keys',
    tooltip: {
      className: 'bg-gray-800 text-white p-2 rounded',
      keys: ['USA', 'Europe'],
    },
  },
};

export const TooltipWithHtml = {
  args: {
    ...Styled.args,
    id: 'pie-chart-tooltip-with-html',
    tooltip: {
      className: 'bg-gray-800 text-white p-2 rounded',
      html: (d: any) =>
        `<div>${d?.data?.name} sold ${d.data['USA']} in USA</div>`,
    },
  },
};

export const SemiCircle = {
  args: {
    ...Styled.args,
    id: 'semi-circle',
    startAngle: -90,
    endAngle: 90,
    labels: {
      radius: 1.1,
      key: 'name',
      text: (data: any) => `${data.name} `,
      className: 'text-black',
    },
  },
};