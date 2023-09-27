import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import PieChart from '.';
import data from './sample.json';

describe('PieChart', () => {
  it('renders PieChart component for snapshot test', () => {
    render(<PieChart
      data={data}
      id='pie-chart'
      valueKey='USA'
      nameKey='name' />);
    const pieChart = screen.getByTestId('pie-chart');
    expect(pieChart).toMatchSnapshot();
  });

  it('renders PieChart component', () => {
    render(<PieChart
      data={data}
      id='pie-chart'
      valueKey='USA'
      nameKey='name' />);
    const pieChart = screen.getByTestId('pie-chart');
    expect(pieChart).toBeInTheDocument();
  });

})