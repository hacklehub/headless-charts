import { Meta } from '@storybook/react';
import SpeedometerChart from '.';

export default {
  title: 'ranges/Speedometer',
  component: SpeedometerChart,
  tags: ['autodocs'],
} as Meta;

export const Default = {
  args: {
    data: 27,
    label: {
      text: 'Coverage',
    },
    id: 'speedometer-default',
  },
};
