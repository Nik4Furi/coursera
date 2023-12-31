import React from 'react'

//-------------ChartJS Specific Stuff
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, ArcElement, Tooltip, Legend } from 'chart.js';

import { Line, Doughnut } from 'react-chartjs-2'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ArcElement, Tooltip, Legend)

// --------------- A line chart, is help we show how many subscribe or un subscribe users 
export const LineChart = ({ views = [] }) => {

    const labels = getLastyearMonth();

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            },
            title: {
                display: true,
                text: "Yearly Views"
            }
        }
    }

    const data = {
        labels,
        datasets: [{
            label: "Views",
            data: views,
            borderColor: 'purple',
            backgroundColor: '#6b46c1'
        }]
    };

    return <Line options={options} data={data} />
}


// --------------- A area label to showing subscribe and not subscribe doughnut chart 
export const DoughnutChart = ({ users = [] }) => {

    const labels = ['Subscribed', 'Not Subscribed'];

    const data = {
        labels,
        datasets: [{
            data: users,
            borderColor: ['rgba(214,43,120)', 'raba(310,29,290,0.2)'],
            backgroundColor: ['#6b46c1', 'rgba(214,43,120,0.3'],
            borderWidth: 1
        }]
    };

    return <Doughnut data={data} />

}

//------------ Now we show labels in form of months 
const getLastyearMonth = () => {

    let labels = []; //all months in current month

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const currentMonth = new Date().getMonth();

    const remain = 11 - currentMonth;

    //Now looping on month from remain
    for (let i = currentMonth; i < months.length; i--) {
        labels.unshift(months[i]);
        if (i === 0) break;
    }


    //Now push other remaing months which 
    for (let i = 11; i > remain; i--) {
        if (i === currentMonth) break;
        labels.unshift(months[i]);
    }

    return labels;
}