import { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import SpeedometerChart from '.';

export default {
  title: 'Gauge/Speedometer/Intro',
  component: SpeedometerChart,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof SpeedometerChart>;

export const Default: Story = {
  args: {
    data: 0.7,
    label: {
      text: 'Coverage',
    },
    id: 'speedometer-default',
  },
};

export const WithRadius: Story = {
  args: {
    ...Default.args,
    id: 'speedometer-with-radius',
    needleRadius: 0.5,
  },
};

export const WithAxisTicks: Story = {
  args: {
    ...Default.args,
    id: 'speedometer-with-axis-ticks',
    axisTicks: 10,
  },
};

export const UpdatingData = () => {
  const [speedometerData, setSpeedometerData] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setSpeedometerData(Math.random());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <SpeedometerChart
        id='speedometer-chart-updating-data'
        data={speedometerData}
        label={{ text: 'Coverage' }}
      />
    </>
  );
};
