import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import BarChartStacked from '.';
import data from './sample.json';

describe('BarChartStacked', () => {
  it('renders barchartstacked component for snapshot test', () => {
    render(
      <BarChartStacked
        data={data}
        id='barChartStacked-test'
        x={[
          {
            key: 'reading',
            className: '',
          },
          { key: 'value', className: '' },
        ]}
        y={{ key: 'name', className: '' }}
      />
    );
    const barChartStacked = screen.getByTestId('barChartStacked');
    expect(barChartStacked).toMatchSnapshot();
  });
  it('renders barchartstacked component', () => {
    render(
      <BarChartStacked
        data={data}
        id='barChartStacked-test'
        x={[
          {
            key: 'reading',
            className: '',
          },
          { key: 'value', className: '' },
        ]}
        y={{ key: 'name', className: '' }}
      />
    );
    const barChartStacked = screen.getByTestId('barChartStacked');
    expect(barChartStacked).toBeInTheDocument();
  });
});
