import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import DotPlot from '.';
import data from './sample.json';

describe('DotPlot', () => {
  it('renders DotPlot component for snapshot test', () => {
    render(
      <DotPlot
        data={data}
        id='dotPlot'
        x={{
          minKey: 'minTemp',
          maxKey: 'maxTemp',
          axis: 'bottom',
          axisTicks: 5,
          start: 0,
          end: 5,
        }}
        y={{
          key: 'label',
          axis: 'left',
        }}
        shape='circle'
      />
    );
    const dotPlot = screen.getByTestId('dotPlot-test');
    expect(dotPlot).toMatchSnapshot();
  });
  it('renders DotPlot component', () => {
    render(
      <DotPlot
        data={data}
        id='dotPlot'
        x={{
          minKey: 'minTemp',
          maxKey: 'maxTemp',
          axis: 'bottom',
          axisTicks: 5,
          start: 0,
          end: 5,
        }}
        y={{
          key: 'label',
          axis: 'left',
        }}
        shape='circle'
      />
    );
    const dotPlot = screen.getByTestId('dotPlot-test');
    expect(dotPlot).toBeInTheDocument();
  });
});
