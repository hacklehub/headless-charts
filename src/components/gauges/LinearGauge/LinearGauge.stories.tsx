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

export const Error = {
  args: {
    id: 'linear-gauge-with-error',
    label: 'linear Gauge With Error',
    data: 23,
    max: 25,
    error: { data: 0.5, className: 'text-red' },
  },
};

export const ToolTip = {
  args: {
    id: 'linear-gauge-with-tooltip',
    className: '',
    label: 'Linear Gauge Graph With Tooltip',
    data: 67,
    max: 100,
    drawing: { duration: 2000 },
    tooltip: {
      html: (data = 45, error = { data: 20, className: 'bg-red' }) => {
        return (
          <div>
            <p>Data: ${data}</p>${error ? `<p>Error: ${error.data}</p>` : ''}
          </div>
        );
      },
      className: 'bg-gray-800 text-white p-2 rounded',
    },
  },
};
