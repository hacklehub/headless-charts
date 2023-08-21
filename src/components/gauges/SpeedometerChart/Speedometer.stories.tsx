import { Meta } from '@storybook/react';
import React from 'react';
import SpeedometerChart from '.';

export default {
  title: 'Gauge/Speedometer',
  component: SpeedometerChart,
  tags: ['autodocs'],
} as Meta;

export const Default = {
  args: {
    data: 0.7,
    label: {
      text: 'Coverage',
    },
    id: 'speedometer-default',
  },
};

export const WithRadius = {
  args: {
    ...Default.args,
    id: 'speedometer-with-radius',
    needleRadius: 0.5,
  },
};

export const WithAxisTicks = {
  args: {
    ...Default.args,
    id: 'speedometer-with-axis-ticks',
    axisTicks: 10,
  },
};

export const WithRegions = {
  args: {
    ...Default.args,
    id: 'speedometer-with-regions',
    regions: [
      {
        limit: 0.5,
        className: 'fill-red-500',
      },
      {
        limit: 0.8,
        className: 'fill-yellow-500',
      },
      {
        limit: 0.9,
        className: 'fill-green-500',
      },
      {
        limit: 1,
        className: 'fill-blue-500',
      },
    ],
  },
};

export const UpdatingData = () => {
  const [data, setData] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setData(Math.random() * 50);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <SpeedometerChart
        id='speedometer-chart-updating-data'
        label={{ text: 'Coverage' }}
        data={data}
      />
    </>
  );
};
