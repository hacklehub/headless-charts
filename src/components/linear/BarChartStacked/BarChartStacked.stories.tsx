import BarChartStacked from '.';
import { Meta } from '@storybook/react';
import data from './sample.json';

/**
 * Stacked bar charts are used to compare values across categories by using horizontal bars, with some grouping. Stacked bar charts additionally show proportions within categories.
 *
 *
 * */

const meta: Meta<typeof BarChartStacked> = {
  title: 'Linear/BarChartStacked/Intro',
  component: BarChartStacked,
  tags: ['autodocs'],
  args: {
    x: [
      {
        key: 'macbook',
      },
      {
        key: 'iphone',
      },
      {
        key: 'ipad',
      },
      {
        key: 'wearables',
      },
      {
        key: 'services',
      },
    ],
    y: { key: 'year' },
  },
};

export default meta;

export const Default = {
  args: {
    data,
    id: 'bar-chart-stacked-default',
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
        key: 'macbook',
        className: 'fill-purple-800',
      },
      {
        key: 'iphone',
        className: 'fill-purple-600',
      },
      {
        key: 'ipad',
        className: 'fill-purple-400',
      },
      {
        key: 'wearables',
        className: 'fill-purple-300',
      },
      {
        key: 'services',
        className: 'fill-purple-200',
      },
    ],
    y: { key: 'year', className: 'text-red-500', padding: 10 },
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

export const CustomStyle = {
  args: {
    ...Styled.args,
    id: 'bar-chart-stacked-custom-style',
    style: {
      width: '1024px',
      height: '768px',
    },
  },
};
