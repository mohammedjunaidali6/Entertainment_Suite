import React, { Fragment, useState, useEffect } from 'react';
import Table from "../../common/reactTable/table";
import Select from 'react-select';
import {journeyColumns, journeyData} from "./tempData";


import three_dot_src from '../../../assets/img/3dots_verticals.svg';
import add_gray_src from '../../../assets/img/add_gray.svg';
import './journey.css';

const tempDraggedItems = [
    {id: 1, name: "Login to the App"},
    {id: 2, name: "Add Product to Cart"},
    {id: 3, name: "Added Product to wishlist"},
    {id: 4, name: "First Purchase"},
    {id: 5, name: "Second Purchase"},
    {id: 6, name: "Not Purchase last 2 months"},
    {id: 7, name: "Added Product to wishlist"},
    {id: 8, name: "Added Product to wishlist"},
]

const tempDroppedItems = [
    {id: 1, name: "Login to the App", subHeading: "Channel Options", data: []},
    {id: 2, name: "Add Product to Cart", subHeading: "No of products added to cart", data: []},
    {id: 3, name: "Added Product to wishlist", subHeading: "No of products added to whislist", data: []},
    {id: 4, name: "First Purchase", subHeading: "No of products added to cart", data: []},
    {id: 5, name: "Second Purchase", subHeading: "Channel Options", data: []},
    {id: 6, name: "Not Purchase last 2 months", subHeading: "No of products added to cart", data: []}
]

const options = [
    { value: 'val 1', label: 'val 1' }
]

export default function EngagementsJourney(props) {

    const [ createFlag, setCreateFlag] = useState(false);
    const [ droppedItems, setDroppedItems] = useState(tempDroppedItems);


    const createClick = () => {
        setCreateFlag(true)
    }

    const onDragStart = (event, data) => {
        event.dataTransfer.setData("draggedTask", JSON.stringify(data));
    }

    const onDragOver = (event) => {
        event.preventDefault();
    }

    const onDrop = (event) => {
        if(event.dataTransfer) {
            // console.log('event.dataTransfer', JSON.parse(event.dataTransfer.getData("draggedTask")));
            let tempObj = {
                id: tempDroppedItems && tempDroppedItems.length > 0 ? tempDroppedItems.length + 1 : 1, 
                name: JSON.parse(event.dataTransfer.getData("draggedTask")).name, 
                subHeading: JSON.parse(event.dataTransfer.getData("draggedTask")).subHeading, 
                data: []
            }
            tempDroppedItems.push(tempObj);
        }
    }

    useEffect(() => {
        setDroppedItems(tempDroppedItems);
        console.log('droppedItems', droppedItems);
    }, []);

    return (
        console.log('ReRender check'),
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
                    <div className="create-new-journey-container w-100 float-left clearfix">
                        <div className = 'heading-c-j'>Create New Journey</div>
                        <div className="w-100 float-left clearfix">
                            <div className='journey-name-c-j w-100 float-left clearfix'>Journey Name</div>
                            <input className='input-field-c-j w-50 float-left clearfix' type="text" placeholder="First Purchase User's journey"/>
                        </div>
                        <div className="c-j-lbl-u-t w-100 float-left clearfix">User tasks</div>
                        <div className="dragable-tasks w-100 float-left clearfix">
                            {tempDraggedItems && tempDraggedItems.length > 0 ? (
                                <Fragment>
                                    {tempDraggedItems.map((taskObj) => (
                                        <div className="w-25 float-left clearfix" key={taskObj.id} draggable={true} onDragOver={(event) => onDragOver(event)} onDragStart={(event) => onDragStart(event, taskObj)}>
                                            <div className="u-t-box w-97 float-left clearfix">
                                                <span className="u-t-box-h">{taskObj.name}</span>
                                                <img src={three_dot_src} alt={taskObj.name} />
                                                <img src={three_dot_src} alt={taskObj.name} />
                                            </div>
                                        </div>
                                    ))}
                                </Fragment>
                            ) : null}
                        </div>
                        <div className="dd-h w-100 float-left clearfix">Drag and drop the task to Journey</div>
                        <div className="dropped-tasks w-100 float-left clearfix">
                            {droppedItems && droppedItems.length > 0 ? (
                                <Fragment>
                                    {droppedItems.map((taskObj) => (
                                        <div className="w-25 float-left clearfix" key={taskObj.id}>
                                            <div className="u-t-dropped-box w-97 float-left clearfix">
                                                <div className="u-t-dropped-box-h">
                                                    <div className="u-t-dropped-box-h-lbl">{taskObj.name}</div>
                                                </div>
                                                <div className="u-t-dropped-box-sub-h">{taskObj.subHeading}</div>
                                                <div>
                                                    <Select options={options} className="w-100 float-left clearfix" styles={{fontSize: "12px"}} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="w-25 float-left clearfix">
                                        <div className="u-a-t-drop-template w-97 float-left clearfix" onDragOver={onDragOver} onDrop={(event) => onDrop(event)}>
                                            <div className="u-a-t-drop-template-add">
                                                <img src={add_gray_src} alt="Add" />
                                                <span className="ml-2">Add New Task</span>
                                            </div>
                                            <div className="u-a-t-drop-template-desc mt-1">No Task Assigned</div>
                                        </div>
                                    </div>
                                </Fragment>
                            ) : null}
                        </div>
                        <div className='c-r-controls' style={{marginTop:'50px'}}>
                                    <div className='c-r-button-controls float-right'>
                                        <div className='c-r-cancel-button disp-inline-block' role="button" onClick={()=>setCreateFlag(false)}>
                                            <div className='cancel-btn-font'>Cancel</div>
                                        </div>
                                        <div className='c-r-add-button disp-inline-block' role="button" onClick={()=>setCreateFlag(false)}>
                                            <div className='add-btn-font'>Save</div>
                                        </div>
                                    </div>
                        </div>
                    </div>
                    {/* <TaskDragDrop /> */}
                </Fragment>
            )}
        </div>
    )
}
