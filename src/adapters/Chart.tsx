import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  LineController,
  BarController,
  ChartData,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  LineController,
  BarController
);

type ChartProps = {
  type: "line" | "bar";
  data: number[];
  labels: string[];
  header: string;
};

function CustomChart({ type, data, labels, header }: ChartProps) {
  const chartData: ChartData = {
    labels,
    datasets: [
      {
        type,
        label: header,
        data,
        backgroundColor: "#6610f2",
      },
    ],
  };

  return <Chart type={type} data={chartData} options={{ aspectRatio: 2 }} />;
}

export default CustomChart;
