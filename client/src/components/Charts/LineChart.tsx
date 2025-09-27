import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
    },
    scales: {
        y: {
            grid: {
                color: 'rgba(255, 255, 255, 0.1)',
            },
        },
        x: {
            grid: {
                color: 'rgba(255, 255, 255, 0.1)',
            },
        },
    },
};

const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
        {
            label: 'Threats Detected',
            data: [65, 59, 80, 81, 56, 55],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
        },
    ],
};

export function LineChart({ className }: { className?: string }) {
    return (
        <div className={className}>
            <Line options={options} data={data} />
        </div>
    );
}