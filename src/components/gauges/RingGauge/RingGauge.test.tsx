import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import RingGauge from '.';
import data from './sample.json';

describe('RingGauge', () => {
  it('renders RingGauge component for snapshot test', () => {
    render(<RingGauge
      id='ring-chart'
      data={data}
      labelKey='name'
      dataKey='score'
      targetKey='target' />);
    const ringGauge = screen.getByTestId('ring-gauge');
    expect(ringGauge).toMatchSnapshot();
  });

  it('renders RingGauge component', () => {
    render(<RingGauge
      id='ring-chart'
      data={data}
      labelKey='name'
      dataKey='score'
      targetKey='target' />);
    const ringGauge = screen.getByTestId('ring-gauge');
    expect(ringGauge).toBeInTheDocument();
  });

})
