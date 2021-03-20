import React, { Fragment } from 'react';
import { Bar } from '@reactchartjs/react-chart.js';
import h_dots_src from "../../../assets/img/dots-icon_horizontal.svg";
import info_src from "../../../assets/img/info.svg";
import { BsArrowRepeat } from "react-icons/bs";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        },
      },
      {
        gridLines: {
          color: "rgba(0,0,0,0)"
        } 
      }
    ],
  }
}
const optionsWithoutAxis = {
  scales: {
    xAxes: [{
      display: false
    }],
    yAxes: [{
      display: false
    }],
  }
}
const optionsWithXLine = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
      {
        gridLines: {
          color: "#ffffff"
        } 
      }
    ],
    xAxes: [
      {
        gridLines: {
          color: "rgba(0,0,0,0)"
        }
      }
    ]
  }
}
const optionsWithYLine = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
      {
        gridLines: {
          color: "rgba(0,0,0,0)"
        } 
      }
    ],
    xAxes: [
      {
        gridLines: {
          color: "#ffffff"
        }
      }
    ]
  }
}
const optionsWithOutBGLine = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
      {
        gridLines: {
          color: "#ffffff"
        } 
      }
    ],
    xAxes: [
      {
        gridLines: {
          color: "#ffffff"
        }
      }
    ]
  }
}

export default function BarChart(props) {
  let opt = null;
  if(props.hideAxis) {
    opt = optionsWithoutAxis;
  } else {
    opt = props.noXYLine ? optionsWithOutBGLine : (props.noXLine ? optionsWithYLine : (props.noYLine ? optionsWithXLine : options));
  }
  return (
    <Fragment>
      {!props.hideHeader ? (
        <div className='header'>
          <span className='title chart-heading'>{props.chartTitle ? props.chartTitle : 'Bar Chart'}</span>
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
          <Bar 
            data={props.data} 
            options={opt} 
            backgroundColor={props.backgroundColor ? props.backgroundColor : "var(--bodyBg)"}
            showLines={props.showLines ? props.showLines : true} 
          />
      ) : <div>No chart data found!</div>}
    </Fragment>
  )
}