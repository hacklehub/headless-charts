import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import LinearGauge from '.';


/**
 * Linear Gauges are simple UI elements that display a single value on a linear scale.
 */
export default {
  title: 'Gauge/LinearGauge/Intro',
  component: LinearGauge,
  tags: ['autodocs'],
} as Meta;

/**
 * Linear gauges are quite easy to implement. By default, data is a fraction.
 */

type Story = StoryObj<typeof LinearGauge>;

export const Default: Story = {
  args: {
    id: 'linear-gauge-default',
    className: 'h-12',
    label: 'Linear Gauge Graph',
    data: 0.47,
  },
};

/**
 * Linear gauges can be styled with different className props
 */


export const Styled: Story = {
  args: {
    ...Default.args,
    id: 'linear-gauge-styled',
    className: 'fill-gray-100 text-white rounded',
    classNameGauge: 'fill-green-800 stroke-green-800',
    classNameGaugeBg: 'fill-green-200 stroke-green-200',
  },
};
/**
 * You can customize how slowly you can draw the gauge.
 */
export const Drawing: Story = {
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
export const Error: Story = {
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

/**
 * You can also customize the tooltip with the html parameter
 */

export const ToolTipWithCustomHtml = {
  args: {
    ...Error.args,
    id: 'linear-gauge-with-tooltip-custom-html',
    data: 67,
    max: 100,
    error: { data: 2 },
    tooltip: {
      html: `<div class='bg-gray-800 text-white p-2 rounded'>67 with 2% error</div>`,
    },
  },
};

export const UpdatingData = () => {
  const [data, setData] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setData(Math.random());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <LinearGauge
        id='linear-gauge-updating-data'
        label='Linear Gauge Graph With Updating Data'
        data={data}
      />
    </>
  );
};
