import React, { Fragment, useState } from 'react';
import Table from "../../common/reactTable/table";
import {journeyColumns, journeyData} from "./tempData";
import TaskDragDrop from "./dragDrop";
import './journey.css';

export default function EngagementsJourney(props) {

    const [ createFlag, setCreateFlag] = useState(false)


    const createClick = () => {
        setCreateFlag(true)
    }

    return (
        <div id="engagements-journey-container">
            {!createFlag ? (
            <Fragment>
                <div className='manage-journey-block'>
                    <div className='manage-journey'>Manage journey</div>
                    <div className='manage-journey-text'>6/18 jouneys are part of running campaign</div>
                </div>
                    <div className='btn-create-journey float-right text-center pt-2' onClick={createClick}>
                                <span className="btn-c-j-text">+ Create Journey</span>
                    </div>
               
                <div className='journey-table-block'>
                    <Table columns={journeyColumns} data={ journeyData} />
                </div>
            </Fragment>
    ) : (
        <Fragment>
            <div className = 'create-new-journey-container'>
                <div className = 'heading-c-j'>Create New Journey</div>
                    <div>
                        <div className='journey-name-c-j'>Journey Name</div>
                        <input className='input-field-c-j' type="text" placeholder="First Purchase User's journey"/>
                    </div>
            </div>
            <TaskDragDrop />
        </Fragment>
    )
        }
        </div>
    )
}
