import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import ColumnChartStacked from '.';
import data from './sample.json';

describe('columnChartStacked', () => {
  it('renders columnChartStacked component for snapshot test', () => {
    render(
      <ColumnChartStacked
        id='columnChartStacked'
        data={data}
        x={{ key: 'name' }}
        y={[
          { key: 'value1', className: '' },
          { key: 'value2', className: '' },
          { key: 'value3', className: '' },
        ]}
      />
    );
    const columnChartStacked = screen.getByTestId('columnChartStacked');
    expect(columnChartStacked).toMatchSnapshot();
  });
  it('renders speedometer component', () => {
    render(
      <ColumnChartStacked
        id='columnChartStacked'
        data={data}
        x={{ key: 'name' }}
        y={[
          { key: 'value1', className: '' },
          { key: 'value2', className: '' },
          { key: 'value3', className: '' },
        ]}
      />
    );
    const columnChartStacked = screen.getByTestId('columnChartStacked');
    expect(columnChartStacked).toBeInTheDocument();
  });
});
