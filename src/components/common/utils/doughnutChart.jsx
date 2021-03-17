import React from 'react'
import { Doughnut } from 'react-chartjs-2';

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: false,
        },
      },
      {
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        } 
      }
    ],
  },
}

const DoughnutChart = (props) => (
  <>
    <div className='header'>
      <h1 className='title chart-heading'>{props.chartTitle ? props.chartTitle : 'Doughnut Chart'}</h1>
    </div>
    {props.data ? (
        <Doughnut 
            data={props.data}
        />
    ) : <div>No chart data found!</div>}
  </>
)

export default DoughnutChart