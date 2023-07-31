import LinearGauge from '.';
import { Meta } from '@storybook/react';

export default {
  title: 'Gauges/LinearGauge',
  component: LinearGauge,
  tags: ['lineargauges'],
} as Meta;

export const Default = {
  args: {
    id: 'linear-gauge-default',
    className: '',
    label: 'Linear Gauge Graph',
    data: 47,
    max: 100,
    gaugeHeight: 6,
    marginLeft: 40,
    marginTop: 30,
    marginRight: 40,
    marginBottom: 10,
  },
};

export const Drawing = {
  args: {
    ...Default.args,
    drawing: { duration: 2000 },
  },
};

export const ToolTip = {
  args: {
    id: 'linear-gauge-with-tooltip',
    className: '',
    label: 'Linear Gauge Graph With Tooltip',
    data: 28,
    max: 100,
    drawing: { duration: 2000 },
    tooltip: {
      html: ({ data = 400, error = { data: 300, className: 'bg-red' } }) => {
        <div className={error.className}>
          <p>data: {data}</p>
          <p>Error code: {error.data}</p>
        </div>;
      },
      className: 'bg-red-800 text-white',
    },
  },
};
