export interface ChartProps {
  id: string;
  data: object[];
  className?: string;
  padding?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  drawing: {
    enabled?: boolean;
    duration?: number;
    delay?: number;
  };
}
