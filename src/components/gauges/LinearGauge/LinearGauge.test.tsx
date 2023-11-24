import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import LinearGauge from '.';

describe('LinearGauge', () => {
  it('renders LinearGauge component for snapshot test', () => {
    render(<LinearGauge id='linear-gauge'
      className='h-12'
      label='Linear Gauge Graph'
      data={0.47} />);
    const linearGauge = screen.getByTestId('linear-gauge');
    expect(linearGauge).toMatchSnapshot();
  });

  it('renders LinearGauge component', () => {
    render(<LinearGauge id='linear-gauge'
      className='h-12'
      label='Linear Gauge Graph'
      data={0.47} />);
    const linearGauge = screen.getByTestId('linear-gauge');
    expect(linearGauge).toBeInTheDocument();
  });

})
