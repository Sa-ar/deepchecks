import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  ChartData,
  ChartType,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

type ChartProps = {
  type: ChartType;
  data: ChartData;
}

function CustomChart({ type, data }: ChartProps) {
  return (
    <Chart type={type} data={data} />
  );
}

export default CustomChart;
