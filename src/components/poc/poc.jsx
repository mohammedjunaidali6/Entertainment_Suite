import React, { Fragment, useState } from 'react';
import DataTable from 'react-data-table-component';

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

export default function POC(props) {

    return (
        <div id="poc-container">
            <span>POC Component</span>
            <DataTable
                title="Arnold Movies"
                columns={columns}
                data={data}
            />
        </div>
    )
}
