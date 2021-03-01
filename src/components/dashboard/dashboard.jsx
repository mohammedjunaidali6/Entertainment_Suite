import React, { Fragment } from 'react';
import LineChart from "../common/utils/lineChart";
import CustomerOverview from "./customerOverview/customerOverview";
import './dashboard.css';

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

export default function Dashboard(props) {
    return (
        <Fragment>
            <div id="dashboard-container" className="p-2">
                <div className="overview-heading float-left clearfix mb-2">Sales Overview</div>
                <div className="w-100 float-left clearfix mb-4 sales-overview">
                    <div className="w-50 float-left clearfix  sales-overview-box-outer">
                        <div className="sales-overview-box"></div>
                    </div>
                    <div className="w-50 float-left clearfix sales-overview-box-outer">
                        <div className="sales-overview-box"></div>
                    </div>
                    <div className="w-50 float-left clearfix sales-overview-box-outer">
                        <div className="sales-overview-box"></div>
                    </div>
                    <div className="w-50 float-left clearfix sales-overview-box-outer">
                        <div className="sales-overview-box"></div>
                    </div>
                </div>
                <div className="w-100 float-left clearfix p-4 mb-4 chart-container">
                    <LineChart data={lineChartData}
                                chartTitle="Sales Chart">
                    </LineChart>
                </div>
                <div className="overview-heading float-left clearfix mb-2">Customer Overview</div>
                <CustomerOverview></CustomerOverview>
            </div>
        </Fragment>
    )
}
