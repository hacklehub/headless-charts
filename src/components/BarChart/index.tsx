interface BarChartProps {
  data: object[];
}

const BarChart = ({ data }: BarChartProps) => {
  return <div>{JSON.stringify(data)}</div>;
};

export default BarChart;
