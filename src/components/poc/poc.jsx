import React, { Fragment, useState } from 'react';
import DataTable from 'react-data-table-component';
import LineChart from "../common/utils/lineChart";
import AMLineChart from '../common/amcharts/lineChart';

import './poc.css';

const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }];
const columns = [
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Year',
    selector: 'year',
    sortable: true,
    right: true,
  },
];

const lineChartData = {
    labels: ['Jan 1', 'Jan 8', 'Jan 15', 'Jan 22', 'Feb 1', 'Feb 8', 'Feb 22', 'Mar 1', 'Mar 8'],
    datasets: [
      {
        label: 'Revenue',
        data: [12, 44, 10, 78, 35, 68, 97, 120, 57],
        fill: false,
        backgroundColor: '#3794FC',
        borderColor: '#3794FC',
      },{
          label: 'Cost',
          data: [47, 14, 57, 88, 24, 97, 68, 39, 85],
          fill: false,
          backgroundColor: '#9D60FB',
          borderColor: '#9D60FB',
      }
    ],
}
// const datas = [
//     [10, 30, 40, 20],
//     [10, 40, 30, 20, 50, 10],
//     [60, 30, 40, 20, 30]
// ]

// const createData = () => {
//     const data = [];
//     let price1 = 1000;
//     let price2 = 1200;
//     for (let i = 0; i < 10; i++) {
//       price1 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
//       data.push({ date1: new Date(2015, 0, i), price1 });
//     }
//     for (let i = 0; i < 10; i++) {
//       price2 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
//       data.push({ date2: new Date(2017, 0, i), price2 });
//     }
   
//     return data;
// }

export default function POC(props) {

    return (
        <div id="poc-container" >
            <span>POC Component</span>
            <DataTable
                title="Arnold Movies"
                columns={columns}
                data={data}
            />
            <br></br>
            <div className="w-100 float-left clearfix p-4 chart-container">
                <LineChart data={lineChartData}
                            chartTitle="Sales Chart">
                </LineChart>
            </div>
            <br></br>
            {/* <div style={{ width: '80%', margin: '0 auto' }}>
                <AMLineChart data={createData()}></AMLineChart>
            </div> */}
        </div>
    )
}
