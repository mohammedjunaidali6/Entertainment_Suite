import React, { Fragment } from 'react';
import { Doughnut } from 'react-chartjs-2';
import h_dots_src from "../../../assets/img/dots-icon_horizontal.svg";
import info_src from "../../../assets/img/info.svg";
import { BsArrowRepeat } from "react-icons/bs";

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

export default function DoughnutChart(props) {

  return (
    <Fragment>
      {!props.hideHeader ? (
        <div className='header'>
          <span className='title chart-heading'>{props.chartTitle ? props.chartTitle : 'Doughnut Chart'}</span>
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
        <Doughnut 
          data={props.data}
        />
      ) : <div>No chart data found!</div>}
    </Fragment>
  )
}