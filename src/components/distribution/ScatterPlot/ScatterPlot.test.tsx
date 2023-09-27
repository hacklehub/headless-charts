import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import ScatterPlot from '.';
import data from './sample.json';

describe('ScatterPlot', () => {
  it('renders ScatterPlot component for snapshot test', () => {
    render(<ScatterPlot
      id='scatterplot'
      data={data}
      x={{
        key: 'gdp',
      }}
      y={{
        key: 'purchasing_power',
      }} />);
    const scatterPlot = screen.getByTestId('scatterplot');
    expect(scatterPlot).toMatchSnapshot();
  });

  it('renders ScatterPlot component', () => {
    render(<ScatterPlot
      id='scatterplot'
      data={data}
      x={{
        key: 'gdp',
      }}
      y={{
        key: 'purchasing_power',
      }} />);
    const scatterPlot = screen.getByTestId('scatterplot');
    expect(scatterPlot).toBeInTheDocument();
  });

})
