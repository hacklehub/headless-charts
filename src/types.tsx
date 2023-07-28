export interface ChartProps {
  id: string;
  data: object[];
  className?: string;
  padding?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    bar?: number;
  };
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  drawing?: {
    duration?: number;
    delay?: number;
  };
  zooming?: {
    enabled?: boolean;
    min?: number;
    max?: number;
  };
}
