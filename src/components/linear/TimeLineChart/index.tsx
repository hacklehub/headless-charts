import React, { useCallback, useEffect } from 'react';
import { defaultChartClassNames, mergeTailwindClasses } from '../../../utils';

import { selectAll } from 'd3-selection';

interface TimeLineChartProps {
  id: string;
  data: any;
  className?: string;
  rectangle?: {
    start?: any;
    end?: any;
    styleKey?: string;
    classNameMap?: object;
  };
  circle?: {
    center?: any;
    styleKey?: string;
    classNameMap?: object;
  };
}

const TimeLineChart = ({ id, data, className }: TimeLineChartProps) => {
  const refreshChart = useCallback(() => {}, []);

  useEffect(() => {
    refreshChart();
    return () => {
      selectAll(`#tooltip-${id}`).remove();
    };

    return () => {
      selectAll(`#tooltip-${id}`).remove();
    };
  }, [data, id, className]);

  return (
    <svg
      id={id}
      className={mergeTailwindClasses(defaultChartClassNames, className)}></svg>
  );
};

export default TimeLineChart;
