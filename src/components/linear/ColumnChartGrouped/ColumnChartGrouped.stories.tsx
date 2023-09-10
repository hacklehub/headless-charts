import React, { useState } from 'react';

/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {transition} from 'd3-transition';
import ColumnChartGrouped from '.';
import { Meta } from '@storybook/react';
import data from './sample.json';

export default {
  title: 'Linear/ColumnChartGrouped',
  component: ColumnChartGrouped,
  tags: ['autodocs'],
} as Meta;

export const Default = {
  args: {
    data,
    id: 'column-chart-group-default',
    x: { key: 'name' },
    y: [
      {
        key: 'USA',
        start: 0,
      },
      { key: 'Europe' },
      { key: 'APAC' },
      { key: 'Africa' },
    ],
  },
};

export const Styled = {
  args: {
    data,
    id: 'column-chart-group-styled',
    className: 'bg-gray-100 rounded',
    padding: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 5,
      bar: 0.1,
    },
    margin: {
      top: 10,
      right: 40,
      bottom: 40,
      left: 60,
    },
    x: { key: 'name', className: 'fill-blue-500' },
    y: [
      {
        key: 'USA',
        start: 0,
        className: 'text-purple-300',
      },
      { key: 'Europe', className: 'text-purple-500 ' },
      { key: 'APAC', className: 'text-purple-700' },
      { key: 'Africa', className: 'text-purple-900' },
    ],
  },
};

export const Animated = {
  args: {
    ...Default.args,
    drawing: { duration: 1000 },
  },
};

export const WithTooltip = {
  args: {
    ...Default.args,
    tooltip: {
      className: 'bg-gray-100 rounded p-2',
    },
  },
};

export const WithCustomTooltip = {
  args: {
    ...Default.args,
    tooltip: {
      html: (data: any) => {
        return `
          <div class="bg-gray-100 rounded p-2">
            <div class="text-sm font-semibold">${data.name}</div>
            <div class="text-xs">${data['USA']}</div>
          </div>
        `;
      },
    },
  },
};

// export const DataRefreshWithDrawing = () => {
//   const [pieData, setPieData] = useState(data);
//   const refreshData = () => {
//     setPieData(
//       pieData.map((d) => ({ ...d, USA: d['USA'] + Math.random() * 1000 }))
//     );
//   };
//   return (
//     <div>
//       <button onClick={refreshData}>Refresh</button>
//       <ColumnChartGrouped id='column-chart-grouped' data={pieData} />
//     </div>
//   );
// };

// The above should be remove

export const UpdatingData = () => {
  const [columnChartData, setColumnChartData] = React.useState(data);
  const updateData = () => {
    setColumnChartData(
      columnChartData.map((d) => ({
        ...d,
        USA:  Math.random() * 1000,
        Europe: Math.random() * 1000,
        APAC: Math.random() * 1000,
      })))
  }

  const t = transition().duration(1000);
  console.log(columnChartData)
  return (
    <>
      <a onClick={()=>{
        updateData()
      }}> {"Update Data"} </a>
      <ColumnChartGrouped
        id='column-chart-grouped-updating-data'
        data={columnChartData}
        x={{
          key: 'name',
          axis: 'bottom',
        }}
        y={[
          {
            key: 'USA',
            start: 0,
            className: 'text-purple-300',
          },
          { key: 'Europe', className: 'text-purple-500 ' },
          { key: 'APAC', className: 'text-purple-700' },
          { key: 'Africa', className: 'text-purple-900' },
        ]}
        transition={t}
      />
    </>
  );
};
