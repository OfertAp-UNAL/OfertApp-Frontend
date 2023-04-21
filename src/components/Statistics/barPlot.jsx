import React, { Component } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const options = {
    responsive: false,
    plugins: {
        legend: {
        position: 'top',
        },
        title: {
        display: true,
        text: 'Chart.js Bar Chart',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => 2),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => 3),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

class BarPlot extends Component {
    render() {
        return (
            <Bar data={data} options={options} />
        );
    }
}

export default BarPlot;