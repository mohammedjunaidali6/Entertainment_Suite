import React, { Fragment } from 'react';
import { Line } from '@reactchartjs/react-chart.js';
import h_dots_src from "../../../assets/img/dots-icon_horizontal.svg";
import info_src from "../../../assets/img/info.svg";
import { BsArrowRepeat } from "react-icons/bs";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
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
const optionsWithoutAxis = {
  legend: {
    display: false
  },
  // tooltips: {
  //     callbacks: {
  //       label: function(tooltipItem) {
  //               return tooltipItem.yLabel;
  //       }
  //     }
  // },
  scales: {
    xAxes: [{
      display: false
    }],
    yAxes: [{
      display: false
    }],
  }
}

export default function LineChart(props) {
  let opt = null;
  if(props.hideAxis) {
    opt = optionsWithoutAxis;
  } else {
    opt = options;
  }
  return (
    <Fragment>
      {!props.hideHeader ? (
        <div className='header'>
          <span className='title chart-heading'>{props.chartTitle ? props.chartTitle : 'Line Chart'}</span>
          {props.showAction ? (
            <img src={h_dots_src} alt="Dot Action" className="float-right ml-2" />
          ) : null}
          {props.showInfo ? (
            <img src={info_src} alt="Info Action" className="float-right ml-2" />
          ) : null}
          {props.showRefresh ? (
            <BsArrowRepeat className="float-right ml-2 mr-2 c-pointer"></BsArrowRepeat>
          ) : null}
        </div>
      ) : null}
      {props.data ? (
          <Line 
              data={props.data} 
              options={opt} 
              backgroundColor={props.backgroundColor ? props.backgroundColor : "var(--bodyBg)"}
              showline={props.showLine ? props.showLine : true} 
              scaleShowLabels={false}
          />
      ) : <div>No chart data found!</div>}
    </Fragment>
  )
}

