import React from 'react'
import { Bar } from '@reactchartjs/react-chart.js'

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

const BarChart = (props) => (
  <>
    <div className='header'>
      <h1 className='title chart-heading'>{props.chartTitle ? props.chartTitle : 'Bar Chart'}</h1>
    </div>
    {props.data ? (
        <Bar 
            data={props.data} 
            options={options} 
            backgroundColor={props.backgroundColor ? props.backgroundColor : "var(--bodyBg)"}
            showline={props.showLine ? props.showLine : true} 
        />
    ) : <div>No chart data found!</div>}
  </>
)

export default BarChart;