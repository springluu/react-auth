import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

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
    backgroundColor: 'rgba(0,0,0,0)',
    plugins: {
        legend: {
            display: false,
            position: 'bottom',
        },
        title: {
            display: false,
            text: 'Line Chart',
        },
    },
    scales: {
        x: {
            ticks: {
                display: true,
                color: '#fff',
            },
            grid: {
                drawBorder: false,
                display: true,
                color: '#777'
            },
            border:{
                display:false
            }
        },
        y: {
            ticks: {
                display: false,
                beginAtZero: false,
            },
            grid: {
                drawBorder: false,
                display: false,
                color: '#fff',
            },
            border:{
                display:false
            }
        },
    },
};

const labels = ['1月', '2月', '3月', '4月', '5月', '6月', '7月'];

const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: '#FFCC21',
            backgroundColor: '#FFCC21',
        },
        {
            label: 'Dataset 2',
            data: [59, 80, 81, 56, 55, 40, 10],
            borderColor: '#8FE9D0',
            backgroundColor: '#8FE9D0',
        },
    ],
};

export { LineChart }

function LineChart() {
    return (
        <Line options={options} data={data} />
    )
}
