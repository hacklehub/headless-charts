import { Meta } from '@storybook/react';
import PieChart from '.';
import data from './sample.json';
import { useState } from 'react';

/**
 * SemiCircle charts are specifically useful for certain representations like political polls or seat shares, since they look like the seating arrangement in a parliament.
 */
const meta: Meta<typeof PieChart> = {
  title: 'Distribution/PieChart/Detailed',
  tags: ['autodocs'],
};

export default meta;

// type Story = StoryObj<typeof PieChart>;

const classNameMap = {
  'Product A': 'fill-purple-700 dark:fill-purple-100',
  'Product B': 'fill-purple-500 dark:fill-purple-300',
  'Product C': 'fill-purple-300 dark:fill-purple-500',
};

/**
 * SemiCircle charts are a variant of pie charts. Simply specify `startAngle` and `endAngle` props and set it to -90 and 90.
 */

export const DataRefresh = () => {
  const [pieData, setPieData] = useState(data);
  const refreshData = () => {
    setPieData(
      pieData.map((d) => ({ ...d, USA: d['USA'] + Math.random() * 1000 }))
    );
  };
  return (
    <div>
      <button onClick={refreshData}>Refresh</button>
      <PieChart
        id='pie-chart-detailed'
        data={pieData}
        valueKey='USA'
        nameKey='name'
        classNameMap={classNameMap}
        tooltip={{}}
      />
    </div>
  );
};

export const DataRefreshWithDrawing = () => {
  const [pieData, setPieData] = useState(data);
  const refreshData = () => {
    setPieData(
      pieData.map((d) => ({ ...d, USA: d['USA'] + Math.random() * 1000 }))
    );
  };
  return (
    <div>
      <button onClick={refreshData}>Refresh</button>
      <PieChart
        id='pie-refresh-with-drawing'
        data={pieData}
        valueKey='USA'
        nameKey='name'
        classNameMap={classNameMap}
        drawing={{
          duration: 1000,
        }}
        tooltip={{}}
      />
    </div>
  );
};

export const AddNewDataPoint = () => {
  const [pieData, setPieData] = useState(data);
  const addDataPoint = () => {
    setPieData([
      ...pieData,
      {
        name: `Product D`,
        USA: Math.random() * 50000,
        Europe: Math.random() * 1000,
        APAC: Math.random() * 1000,
      },
    ]);
  };

  const classNameMapNew = {
    ...classNameMap,
    'Product D': 'fill-purple-800',
  };
  return (
    <div>
      <button onClick={addDataPoint}>Add Data Point</button>
      <PieChart
        id='pie-chart-add-new-data-point'
        data={pieData}
        valueKey='USA'
        nameKey='name'
        classNameMap={classNameMapNew}
        drawing={{
          duration: 1000,
        }}
        tooltip={{}}
      />
    </div>
  );
};
