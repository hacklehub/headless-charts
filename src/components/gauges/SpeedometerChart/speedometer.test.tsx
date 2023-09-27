import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import SpeedometerChart from '.';

describe('SpeedometerChart', () => {
  it('renders speedometer component for snapshot test', () => {
    render(<SpeedometerChart data={50} id='speedometer-chart' />);
    const speedometer = screen.getByTestId('speedometer');
    expect(speedometer).toMatchSnapshot();
  });

  it('renders speedometer component', () => {
    render(<SpeedometerChart data={50} id='speedometer-chart' />);
    const speedometer = screen.getByTestId('speedometer');
    expect(speedometer).toBeInTheDocument();
  });

})
