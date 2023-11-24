import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import PizzaChart from '.';
import data from './sample.json';

describe('PizzaChart', () => {
  it('renders PizzaChart component for snapshot test', () => {
    render(<PizzaChart id='pizza-chart'
      data={data}
      metrics={[
        {
          key: 'metric1',
        },
        {
          key: 'metric2',
        },
        {
          key: 'metric3',
        },
        {
          key: 'metric4',
        },
        {
          key: 'metric5',
        },
        {
          key: 'metric6',
        },
        {
          key: 'metric7',
        },
      ]} />);
    const pizzaChart = screen.getByTestId('pizza-chart');
    expect(pizzaChart).toMatchSnapshot();
  });

  it('renders PizzaChart component', () => {
    render(<PizzaChart id='pizza-chart'
      data={data}
      metrics={[
        {
          key: 'metric1',
        },
        {
          key: 'metric2',
        },
        {
          key: 'metric3',
        },
        {
          key: 'metric4',
        },
        {
          key: 'metric5',
        },
        {
          key: 'metric6',
        },
        {
          key: 'metric7',
        },
      ]} />);
    const pizzaChart = screen.getByTestId('pizza-chart');
    expect(pizzaChart).toBeInTheDocument();
  });

})
