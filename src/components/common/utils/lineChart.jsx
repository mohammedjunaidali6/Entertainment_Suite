import React from 'react'
import { Line } from '@reactchartjs/react-chart.js'

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

const LineChart = (props) => (
  <>
    <div className='header'>
      <h1 className='title chart-heading'>{props.chartTitle ? props.chartTitle : 'Line Chart'}</h1>
    </div>
    {props.data ? (
        <Line 
            data={props.data} 
            options={options} 
            backgroundColor={props.backgroundColor ? props.backgroundColor : "var(--bodyBg)"}
            showline={props.showLine ? props.showLine : true} 
        />
    ) : <div>No chart data found!</div>}
  </>
)

export default LineChart