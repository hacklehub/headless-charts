import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import ColumnChartGrouped from '.';

const data = [
  {
    name: 'Product A',
    USA: 10000,
    Europe: 4000,
    APAC: 5000,
    Africa: 1000,
  },
  { name: 'Product B', USA: 9400, Europe: 9000, APAC: 4000, Africa: 0 },
  { name: 'Product C', USA: 8000, Europe: 4000, APAC: 1000, Africa: 0 },
];

describe('ColumnChartGrouped', () => {
  it('renders columnChartGrouped component for snapshot test', () => {
    render(
      <ColumnChartGrouped
        id='columnChartGrouped'
        data={data}
        x={{ key: 'name' }}
        y={[
          {
            key: 'USA',
            start: 0,
          },
          { key: 'Europe' },
          { key: 'APAC' },
          { key: 'Africa' },
        ]}
      />
    );
    const columnChartGrouped = screen.getByTestId('columnChartGrouped');
    expect(columnChartGrouped).toMatchSnapshot();
  });
  it('renders columnChartGrouped component', () => {
    render(
      <ColumnChartGrouped
        id='columnChartGrouped'
        data={data}
        x={{ key: 'name' }}
        y={[
          {
            key: 'USA',
            start: 0,
          },
          { key: 'Europe' },
          { key: 'APAC' },
          { key: 'Africa' },
        ]}
      />
    );
    const columnChartGrouped = screen.getByTestId('columnChartGrouped');
    expect(columnChartGrouped).toBeInTheDocument();
  });
});
