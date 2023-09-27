import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import LollipopHChart from '.';
import data from './sample.json';

describe('LollipopHChart', () => {
  it('renders lollipopHChart component for snapshot test', () => {
    render(
      <LollipopHChart
        data={data}
        id='lollipop-h-chart'
        x={{
          key: 'value',
          start: 0,
        }}
        y={{
          key: 'name',
        }}
      />
    );
    const lollipopHChart = screen.getByTestId('lollipopHChart');
    expect(lollipopHChart).toMatchSnapshot();
  });
  it('renders lollipopHChart component', () => {
    render(<LollipopHChart id='lollipopHChart' data={data} />);
    const lollipopHChart = screen.getByTestId('lollipopHChart');
    expect(lollipopHChart).toBeInTheDocument();
  });
});
