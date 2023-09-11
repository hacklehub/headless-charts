import { Meta, StoryObj } from '@storybook/react';

/* eslint-disable @typescript-eslint/no-explicit-any */
import BulletChart from '.';
import React from 'react';

const data = 85;

/** Bullet chart is a single metric linear gauge. It shows achievement against 4 different metrics (base, target, threshold, max)
 * We can use it to show progress towards a goal.
 *
 * Built in a headless fashion, you can apply individual styles to all elements
 */
export default {
  title: 'Gauge/BulletChart/Intro',
  component: BulletChart,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof BulletChart>;

/**
 * Default BulletChart (Headless and unstyled).
 */
export const Default: Story = {
  args: {
    data,
    label: 'Sales',
    id: 'bullet-chart-default',
    min: 0,
    base: 50,
    target: 80,
    threshold: 90,
    max: 100,
  },
};

export const Styled: Story = {
  args: {
    ...Default.args,
    id: 'bullet-chart-styled',
    className: 'bg-gray-100 rounded',
    classNameData: 'fill-slate-500',
    classNameTarget: 'fill-blue-500 stroke-blue-500',
    classNameMax: 'fill-red-500',
    classNameThreshold: 'fill-yellow-500',
    classNameBase: 'fill-green-500',
  },
};

export const UpdatingData = () => {
  const [data, setData] = React.useState(0);
  console.log(data, 'initial data');
  React.useEffect(() => {
    const interval = setInterval(() => {
      setData(Math.random() * 50);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <BulletChart
        id='bullet-chart-updating-data'
        data={data}
        base={50}
        target={80}
        threshold={90}
        max={100}
      />
    </>
  );
};
