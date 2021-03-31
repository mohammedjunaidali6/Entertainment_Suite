import React, { Fragment } from 'react';
import DataTable from 'react-data-table-component';
import { TABLE_PAGE_COUNT } from "../../../constants/globalConstants";

const customStyle ={
    headCells:{
        style:{
            height: '50px',
            backgroundColor: '#F0F0F0',
            color: '#191D28' ,
            fontFamily: 'Roboto',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: 0,
            lineHeight: '19px'
        }
    },

    cells:{
        style:{
            // height: '40px',
            color: '#6A6976',
            fontFamily: 'Roboto',
            fontSize: '12px',
            letterSpacing: 0,
            lineHeight: '18px',
        }
    }
}

export default function Table(props){

    const onSelectedRowsChangeFn = (ev) => {
        props.selectedRowsFn(ev);
    }

    return(
        <Fragment>
           {props.data && props.data.length > 0 && props.columns && props.columns.length> 0?
           <Fragment>
               {/* want to load subHeaderComponent you must pass 
               subHeader as well true from the corresponding components */}
               <DataTable
                    noHeader={props.noHeader ? props.noHeader : true}
                    columns = {props.columns}
                    data ={props.data}
                    striped
                    action ={props.actions ? props.actions : null}
                    subHeader={props.subHeader ? props.subHeader : false}
                    subHeaderComponent={props.subHeaderComponent ? props.subHeaderComponent : []}
                    subHeaderAlign={props.subHeaderAlign ? props.subHeaderAlign : 'left'}
                    pagination = {props.pagination ? props.pagination : false}
                    paginationPerPage ={props.pageCount ? props.pageCount : TABLE_PAGE_COUNT} 
                    customStyles={customStyle} 
                    noTableHead = {props.noTableHead ? props.noTableHead : false}
                    selectableRows={props.selectableRows ? props.selectableRows : false}
                    onSelectedRowsChange={onSelectedRowsChangeFn}
                    style={{borderRadius: "6px", marginBottom: "12px"}}
                />
            </Fragment> :<div>Data Not found</div>} 
        </Fragment>
    )
}