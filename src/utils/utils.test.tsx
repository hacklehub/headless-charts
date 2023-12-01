import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import convertToRanks from './convertToRanks';
import { deepValue } from '.';
import mergeTailwindClasses from './mergeTailwindClasses';

describe('mergeTailwindClasses', () => {
  it('should merge tailwind classes', () => {
    // When multiple classes are given, only last one should be taken
    const classes = mergeTailwindClasses('text-red-500', 'text-blue-500');
    expect(classes).toBe('text-blue-500');
  });

  it(`div should not have 'text-red-500' class`, () => {
    render(
      <div
        data-testid='test-div'
        className={mergeTailwindClasses('text-red-500', 'text-blue-500')}
      />
    );
    const testDiv = screen.getByTestId('test-div');
    expect(testDiv).toHaveClass('text-blue-500');
    expect(testDiv).not.toHaveClass('text-red-500');
  });
});

describe('convertToRanks', () => {
  const data = [{ name: 'calories', john: 151, walter: 513, shane: 144 }];
  const y = [{ key: 'john' }, { key: 'walter' }, { key: 'shane' }];
  const x = { key: 'name' };

  it(`Convert an array of object to ranks based on a series of Y`, () => {});

  const rankedData = convertToRanks(data, y, x);

  expect(rankedData).toEqual([
    { name: 'calories', john: 2, walter: 1, shane: 3 },
  ]);

  it(`Convert an array of object to ranks based on a series of Y in ascending order`, () => {
    const rankedData2 = convertToRanks(data, y, x, true);

    expect(rankedData2).toEqual([
      { name: 'calories', john: 2, walter: 3, shane: 1 },
    ]);
  });

  const anotherDataSet = [
    {
      year: '2011',
      'Manchester United': 80,
      Chelsea: 71,
      'Manchester City': 71,
      Arsenal: 68,
      Tottenham: 62,
      Liverpool: 58,
      Everton: 54,
    },
    {
      year: '2012',
      'Manchester United': 89,
      'Manchester City': 90,
      Chelsea: 64,
      Arsenal: 70,
      Tottenham: 69,
      Liverpool: 52,
      Everton: 56,
    },

    {
      year: '2013',
      'Manchester United': 89,
      'Manchester City': 78,
      Chelsea: 75,
      Arsenal: 73,
      Liverpool: 61,
      Tottenham: 72,
      Everton: 63,
    },
    {
      year: '2014',
      'Manchester City': 86,
      Chelsea: 82,
      Arsenal: 79,
      'Manchester United': 64,
      Tottenham: 69,
      Liverpool: 84,
      Everton: 72,
    },
  ];

  const x2 = { key: 'year' };
  const y2 = [
    {
      key: 'Manchester United',
      className: 'text-slate-400 hover:text-red-300 hover:stroke-2',
    },
    {
      key: 'Chelsea',
      className: 'text-slate-400 hover:text-blue-500  hover:stroke-2',
    },
    {
      key: 'Manchester City',
      className: 'text-slate-400 hover:text-blue-100  hover:stroke-2',
    },
    {
      key: 'Arsenal',
      className: 'text-slate-400 hover:text-green-100  hover:stroke-2',
    },
    {
      key: 'Tottenham',
      className: 'text-slate-400 hover:text-green-100  hover:stroke-2',
    },
    {
      key: 'Liverpool',
      className: 'text-slate-400 hover:text-green-100  hover:stroke-2',
    },
    {
      key: 'Everton',
      className: 'text-slate-400 hover:text-green-100  hover:stroke-2',
    },
  ];

  it(`Ranking in array of objects (Key order is immaterial)`, () => {
    const rankedData3 = convertToRanks(anotherDataSet, y2, x2);

    expect(rankedData3).toEqual([
      {
        year: '2011',
        'Manchester United': 1,
        Chelsea: 2,
        'Manchester City': 2,
        Arsenal: 4,
        Tottenham: 5,
        Liverpool: 6,
        Everton: 7,
      },
      {
        year: '2012',
        'Manchester United': 2,
        'Manchester City': 1,
        Chelsea: 5,
        Arsenal: 3,
        Tottenham: 4,
        Liverpool: 7,
        Everton: 6,
      },
      {
        year: '2013',
        'Manchester United': 1,
        'Manchester City': 2,
        Chelsea: 3,
        Arsenal: 4,
        Liverpool: 7,
        Tottenham: 5,
        Everton: 6,
      },
      {
        year: '2014',

        Chelsea: 3,
        Arsenal: 4,
        'Manchester United': 7,
        Tottenham: 6,
        Liverpool: 2,
        Everton: 5,
        'Manchester City': 1,
      },
    ]);
  });
});

describe('deepValue', () => {
  const data = {
    name: 'calories',
    john: 151,
    walter: 513,
    shane: 144,
    nested: {
      name: 'calories',
      john: 151,
      walter: 513,
      shane: 144,
    },
  };

  it(`Get the value of a nested object`, () => {
    expect(deepValue(data, 'name')).toBe('calories');
    expect(deepValue(data, 'nested.name')).toBe('calories');
  });

  it(`Get the value of a nested object`, () => {
    expect(deepValue(data, 'name')).toBe('calories');
    expect(deepValue(data, 'nested.name')).toBe('calories');
  });
});
