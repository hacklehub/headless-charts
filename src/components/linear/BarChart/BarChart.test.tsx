import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import BarChart from '.';
import data from './sample.json';

describe('BarChart', () => {
  const x = [
      {
        key: 'reading',
        className: 'text-red-500',
      },
      { key: 'value', className: 'text-blue-500' },
    ],
    y = { key: 'name' };
  it('renders Simple bar chart', () => {
    render(<BarChart id='bar-chart' data={data} x={x} y={y} />);
    //screen.debug();

    expect(screen).toBeTruthy();
  });

  it('renders Styled Grouped bar chart', () => {
    const padding = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 5,
        bar: 0.1,
      },
      margin = {
        top: 0,
        right: 40,
        bottom: 20,
        left: 40,
      };
    render(
      <BarChart
        id='bar-chart'
        data={data}
        x={x}
        y={y}
        className='bg-red-500'
        padding={padding}
        margin={margin}
      />
    );
    // screen.debug();

    const xAxisTransform = parseInt(
      screen
        .getByTestId('x-axis')
        ?.getAttribute('transform')
        ?.split(',')[1]
        .replace(')', '') || '0'
    );

    const svg = screen.getByTestId('bar-chart');

    expect(svg).toHaveClass('bg-red-500');
    expect(xAxisTransform).toEqual(-margin.bottom);
  });
  it('direction left', () => {
    render(
      <BarChart id='bar-chart' data={data} x={x} y={y} direction='left' />
    );

    // yAxisTransform will be of the type translate(40,0). Extract 40 from it and convert to int
    const yAxisTransform = parseInt(
      screen
        .getByTestId('y-axis')
        ?.getAttribute('transform')
        ?.split(',')[0]
        .split('(')[1] || '0'
    );
    expect(yAxisTransform).toEqual(-40);
  });

  it('Expect labels to be rendered', () => {
    render(
      <BarChart
        id='bar-chart'
        data={data}
        x={x}
        y={y}
        dataLabel={{
          className: 'text-red-500',
        }}
      />
    );

    const labels = screen.getAllByTestId('label');
    expect(labels.length).toEqual(data.length * x.length);
  });
});
