import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import React from 'react';
import SpeedometerChart from '.';

describe('SpeedometerChart', () => {
  it('renders DataBox component', () => {
    render(<SpeedometerChart data={50} id='speedometer-chart'/>);
    const speedometer = screen.getByTestId('speedometer');
    expect(speedometer).toMatchSnapshot();
  });
})
