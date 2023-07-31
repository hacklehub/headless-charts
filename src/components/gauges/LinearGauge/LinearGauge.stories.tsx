import LinearGauge from '.';
import { Meta } from '@storybook/react';

/**
 * Linear Gauges are simple UI elements that display a single value on a linear scale.
 */
export default {
  title: 'Gauge/LinearGauge',
  component: LinearGauge,
  tags: ['autodocs'],
} as Meta;

/**
 * Linear gauges are quite easy to implement. By default, data is a fraction.
 */
export const Default = {
  args: {
    id: 'linear-gauge-default',
    className: '',
    label: 'Linear Gauge Graph',
    data: 0.47,
  },
};

/**
 * 
 */


export const Styled = {
  args: {
    ...Default.args,
    id: 'linear-gauge-styled',
    className: 'fill-gray-100 text-white rounded',
    classNameGauge: 'fill-green-800 stroke-green-800',
    classNameGaugeBg: 'fill-green-200 stroke-green-200',
  },
}
/**
 * You can customize how slowly you can draw the gauge.
 */
export const Drawing = {
  args: {
    ...Default.args,
    id: 'linear-gauge-drawing',
    label: 'Linear Gauge Graph With Drawing',
    drawing: { duration: 2000 },
  },
};

/**
 * You can also setup a LinearGauge with an error value. This is useful if we need to show an error value as well as the data.
 */
export const Error = {
  args: {
    id: 'linear-gauge-with-error',
    label: 'Linear Gauge With Error',
    data: 23,
    max: 25,
    error: { data: 1, className: '' },
  },
};

/**
 * You can also customize the tooltip html
 */
export const ToolTip = {
  args: {
    id: 'linear-gauge-with-tooltip',
    className: '',
    label: 'Linear Gauge Graph With Tooltip',
    data: 67,
    max: 100,
    drawing: { duration: 2000 },
    tooltip: {
      className: 'bg-gray-800 text-white p-2 rounded',
    },
  },
};

/**
 * You can also customize the tooltip with the html parameter
 */
export const ToolTipWithCustomHtml = {
  args: {
    ...ToolTip.args,
    id: 'linear-gauge-with-tooltip-custom-html',
    error: { data: 2 },
    tooltip: {
      html: `<div class='bg-gray-800 text-white p-2 rounded'>67% with 2% error</div>`,
    },
  },
};

