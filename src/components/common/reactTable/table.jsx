import React from 'react';
import DataTable from 'react-data-table-component';

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
            border: '0px',
            fontSize: '12px',
            letterSpacing: 0,
            lineHeight: '18px',
        }
    }
}

export default function Table(props){
    return(
        <div style={{ borderRadius: '10px', boxShadow: '0 0 4px 0 rgba(95,100,112,0.38)'}}>
           {props.data && props.data.length > 0 && props.columns && props.columns.length> 0?
           <div>
               <DataTable
                columns = {props.columns}
                data ={props.data}
                striped
                actions ={props.actions}
                pagination
                paginationPerPage ={6} 
                customStyles={customStyle} />
            </div> :<div>Data Not found</div>} 
        </div>
    )
}