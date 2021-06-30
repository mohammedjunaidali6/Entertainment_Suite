import React, { Fragment, useState, useEffect, useReducer } from 'react';
import Table from "../../common/reactTable/table";
import Select from 'react-select';
import CustomTooltip from "../../common/tooltip/tooltip";
import ActionMenu from "../../common/reactTable/menu";
import _ from 'lodash';
import { containerHeightCalcFn } from "../../common/global";
import SearchBar from "../../common/searchBar/searchBar";
import three_dot_src from '../../../assets/img/3dots_verticals.svg';
import add_gray_src from '../../../assets/img/add_gray.svg';
import './journey.css';
import { getData, postData } from '../../../api/ApiHelper';
import { ADD_JOURNEY_DETAILS, DELETE_JOURNEY_DETAILS, Engagement_Host_URI, JOURNEYS, JOURNEYS_BY_SEARCH, JOURNEY_TASKS, UPDATE_JOURNEY_DETAILS } from '../../../api/apiConstants';
import MessageBox from '../../common/MessageBox/MessageBox';


const tempDraggedItems = [
    { id: 1, name: "Login to the App" },
    { id: 2, name: "Add Product to Cart" },
    { id: 3, name: "Added Product to wishlist" },
    { id: 4, name: "First Purchase" },
    { id: 5, name: "Second Purchase" },
    { id: 6, name: "Not Purchase last 2 months" },
    { id: 7, name: "Added Product to wishlist" },
    { id: 8, name: "Added Product to wishlist" },
]

const tempDroppedItems = [
    { id: 1, name: "Login to the App", subHeading: "Channel Options", data: [] },
    { id: 2, name: "Add Product to Cart", subHeading: "No of products added to cart", data: [] },
    { id: 3, name: "Added Product to wishlist", subHeading: "No of products added to whislist", data: [] },
    { id: 4, name: "First Purchase", subHeading: "No of products added to cart", data: [] },
    { id: 5, name: "Second Purchase", subHeading: "Channel Options", data: [] },
    { id: 6, name: "Not Purchase last 2 months", subHeading: "No of products added to cart", data: [] }
]

const options = [
    { value: 'val 1', label: 'val 1' }
]

export default function EngagementsJourney(props) {
    console.log('***', props)
    const [messageBox, setMessageBox] = useState({ display: false, type: '', text: '' });
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [createFlag, setCreateFlag] = useState(false);
    const [journeysData, setJourneysData] = useState();
    const [journeyName, setJourneyName] = useState();
    const [journeyTasks, setJourneyTasks] = useState();
    const [droppedItems, setDroppedItems] = useState();

    const journeyColumns = [
        {
            name: "Journey ID",
            selector: "JourneyID"
        },
        {
            name: "Journey Name",
            selector: "JourneyName"
        },
        {
            name: "Tasks assigned",
            cell: rowObj =>
                <div style={{ paddingRight: '5px' }}>
                    <div>{rowObj.JourneyTasks.length && rowObj.JourneyTasks[0].JourneyTaskName}</div>
                    <CustomTooltip tooltipText={rowObj.JourneyTasks.length && rowObj.JourneyTasks.map(j => '-> ' + j.JourneyTaskName + ' ')} >
                        <button type="button" className='table-row-btn'>
                            <div className='table-row-btn-text'>{rowObj.JourneyTasks.length}</div>
                        </button>
                    </CustomTooltip>
                </div>
        },
        {
            name: "Created by",
            selector: "CreatedByUser"
        },
        {
            name: "Status",
            cell: rowObj => rowObj.IsActive ? 'Active' : false

        },
        {
            name: " ",
            cell: rowObj => <ActionMenu onAction={e => onActionClick(e, rowObj)} />
        }

    ]

    const createClick = () => {
        setCreateFlag(true)
    }
    const handleMessageBox = (messageType, textToDisplay) => {
        setMessageBox({ display: true, type: messageType, text: textToDisplay });
        setTimeout(() => setMessageBox({ display: false, type: '', text: '' }), 10000)
    }
    const handleLoader = (showBool) => {
        props.routeActionHandler.dispatchLoaderData(showBool);
    }

    const onDragStart = (event, data) => {
        event.dataTransfer.setData("draggedTask", JSON.stringify(data));
    }

    const onDragOver = (event) => {
        event.preventDefault();
    }

    const onDrop = (event) => {
        if (event.dataTransfer) {
            let taskObj = JSON.parse(event.dataTransfer.getData("draggedTask"));
            let tempDroppedItems = [...droppedItems || []];
            tempDroppedItems.push(taskObj);
            setDroppedItems(tempDroppedItems);
            forceUpdate();
        }
    }
    const onTaskValueChange = (e, taskObj) => {
        taskObj.value = e.target.value;
        let selectedTasks = [...droppedItems];
        let taskIndex = _.findIndex(selectedTasks, t => t.journey_task_id == taskObj.journey_task_id);
        selectedTasks.splice(taskIndex, 1, taskObj);
        setDroppedItems(selectedTasks);
    }

    const onSave = () => {
        handleLoader(true);
        let journeyData = {
            JourneyName: journeyName,
            JourneyTasks: droppedItems.map((task, ndx) => {
                return {
                    JourneyTaskID: task.journey_task_id,
                    Value: task.value,
                    Order: ndx + 1
                }
            })
        }
        postData(`${Engagement_Host_URI}${ADD_JOURNEY_DETAILS}`, journeyData)
            .then(response => {
                if (response) {
                    setCreateFlag(false);
                    handleMessageBox('success', `${response.journey_name} Journey Created Succesfully`)
                } else {
                    handleMessageBox('error', `Journey Creation is failed`)
                }
                handleLoader(false);
            });
    }

    const onCancel = () => {
        setCreateFlag(false);
    }

    const searchJourneyByName = (searchText) => {
        if (searchText) {
            getData(`${Engagement_Host_URI}${JOURNEYS_BY_SEARCH}?journey_name=${searchText}`)
                .then(journeys => {
                    var groupedJourneys = groupJourneys(journeys);

                    setJourneysData(groupedJourneys);
                });
        } else {
            getAllJourneys();
        }
    }
    const groupJourneys = (journeys) => {
        var grouped = [];
        journeys.forEach(j => {
            var jrny = _.find(grouped, g => g.JourneyID == j.JourneyID);
            if (jrny) {
                jrny.JourneyTasks.push({
                    JourneyTaskID: j.JourneyTaskID,
                    JourneyTaskName: j.JourneyTaskName
                });
            } else {
                grouped.push({
                    JourneyID: j.JourneyID,
                    JourneyName: j.JourneyName,
                    CreatedBy: j.CreatedBy,
                    CreatedByUser: j.CreatedByUser,
                    IsActive: j.IsActive,
                    JourneyTasks: [{
                        JourneyTaskID: j.JourneyTaskID,
                        JourneyTaskName: j.JourneyTaskName
                    }]
                });
            }
        })
        return grouped;
    }
    const getAllJourneys = () => {
        handleLoader(true);
        getData(`${Engagement_Host_URI}${JOURNEYS}`)
            .then(journeys => {
                var groupedJourneys = groupJourneys(journeys);
                console.log('***', groupedJourneys)
                setJourneysData(groupedJourneys);
                props.engagementsJourneyActionHandler.dispatchJourneysData(groupedJourneys);
                handleLoader(false);
            });
    }
    const getAllJourneyTasks = () => {
        handleLoader(true);
        getData(`${Engagement_Host_URI}${JOURNEY_TASKS}`)
            .then(journeyTasks => {
                setJourneyTasks(journeyTasks);
                props.engagementsJourneyActionHandler.dispatchJourneyTasks(journeyTasks);
                handleLoader(false);
            });
    }

    const onActionClick = (e, rowObj) => {
        console.log('***', e.target.outerText, rowObj)
        let action = e.target.outerText;
        if (action === 'Edit') {
            var data = {

            }
            postData(`${Engagement_Host_URI}${UPDATE_JOURNEY_DETAILS}`, data)
                .then(journeyDetails => {
                    if (journeyDetails) {
                        console.log('***', journeyDetails);
                        getAllJourneys();
                        handleMessageBox('success', `${journeyDetails.JourneyName} Journey Updated Succesfully`);
                    } else {
                        handleMessageBox('error', `Journey Updating failed`);
                    }
                })
        } else if (action === 'Delete') {
            getData(`${Engagement_Host_URI}${DELETE_JOURNEY_DETAILS}?journey_id=${rowObj.JourneyID}`)
                .then(journeyDetails => {
                    console.log('***', journeyDetails);
                    if (journeyDetails) {
                        getAllJourneys();
                        handleMessageBox('success', `${journeyDetails.journey_name} Journey Deleted Succesfully`);
                    } else {
                        handleMessageBox('error', `Journey Deleting failed`);
                    }
                })
        } else {

        }
    }

    useEffect(() => {
        if (createFlag) {
            getAllJourneyTasks();
        }
    }, [createFlag]);

    useEffect(() => {
        getAllJourneys();
    }, []);

    useEffect(() => {
        return (() => {
            let journeyDetails = {
                JourneyName: journeyName,
                JourneyTasks: [...droppedItems || []]
            }
            props.engagementsJourneyActionHandler.dispatchJourneyDetails(journeyDetails);
        });
    }, [journeyName, droppedItems]);


    return (
        <div id="engagements-journey-container">
            <MessageBox display={messageBox.display ? 'block' : 'none'} type={messageBox.type} text={messageBox.text} />
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
                        <Table columns={journeyColumns}
                            data={journeysData}
                            pagination={true}
                            subHeaderComponent={
                                <SearchBar placeHolder="Search journey" onSearch={(searchStr) => searchJourneyByName(searchStr)} fromJourney={true} searchFilter="All Jouneys" />
                            }
                            subHeader={true} />
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    <div className="create-new-journey-container w-100 float-left clearfix" style={{ height: containerHeightCalcFn(186), overflowY: "auto" }}>
                        <div className='heading-c-j'>Create New Journey</div>
                        <div className="w-100 float-left clearfix">
                            <div className='journey-name-c-j w-100 float-left clearfix'>Journey Name</div>
                            <input
                                className='input-field-c-j w-50 float-left clearfix'
                                type="text"
                                placeholder="First Purchase User's journey"
                                onChange={e => e.target.value?.length < 26 && setJourneyName(e.target.value)}
                                value={journeyName}
                            />
                        </div>
                        <div className="c-j-lbl-u-t w-100 float-left clearfix">User tasks</div>
                        <div className="dragable-tasks w-100 float-left clearfix">
                            {journeyTasks && journeyTasks.length > 0 ? (
                                <Fragment>
                                    {journeyTasks.map((taskObj) => (
                                        <div className="w-25 float-left clearfix" key={taskObj.journey_task_id} draggable={true} onDragOver={(event) => onDragOver(event)} onDragStart={(event) => onDragStart(event, taskObj)}>
                                            <div className="u-t-box w-97 float-left clearfix">
                                                <span className="u-t-box-h">{taskObj.event_display_name}</span>
                                                <img src={three_dot_src} alt={taskObj.event_display_name} />
                                                <img src={three_dot_src} alt={taskObj.event_display_name} />
                                            </div>
                                        </div>
                                    ))}
                                </Fragment>
                            ) : null}
                        </div>
                        <div className="dd-h w-100 float-left clearfix">Drag and drop the task to Journey</div>
                        <div className="dropped-tasks w-100 float-left clearfix">
                            <Fragment>
                                {droppedItems && droppedItems.length > 0 && droppedItems.map((taskObj) => (
                                    <div className="w-25 float-left clearfix" key={taskObj.journey_task_id}>
                                        <div className="u-t-dropped-box w-97 float-left clearfix">
                                            <div className="u-t-dropped-box-h">
                                                <div className="u-t-dropped-box-h-lbl">{taskObj.event_display_name}</div>
                                            </div>
                                            <div className="u-t-dropped-box-sub-h">{taskObj.value_question}</div>
                                            <div>
                                                <input
                                                    type='number'
                                                    className="w-100 float-left clearfix"
                                                    styles={{ fontSize: "12px" }}
                                                    disabled={!taskObj.need_value}
                                                    onChange={e => onTaskValueChange(e, taskObj)}
                                                />
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
                        </div>
                        {/* <div className='c-r-controls' style={{marginTop:'50px'}}>
                            <div className='c-r-button-controls float-right'>
                                <div className='c-r-cancel-button disp-inline-block' role="button" onClick={()=>setCreateFlag(false)}>
                                    <div className='cancel-btn-font'>Cancel</div>
                                </div>
                                <div className='c-r-add-button disp-inline-block' role="button" onClick={()=>setCreateFlag(false)}>
                                    <div className='add-btn-font'>Save</div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className="w-100 float-left clearfix c-j-a">
                        <div className="w-50 float-left clearfix"></div>
                        <div className="w-50 float-left clearfix" style={{ marginRight: "45px" }}>
                            <div className="c-j-a-s content-c float-right clearfix" onClick={onSave}>Save</div>
                            <div className="c-j-a-c content-c float-right clearfix" onClick={onCancel}>Cancel</div>
                        </div>
                    </div>
                    {/* <TaskDragDrop /> */}
                </Fragment>
            )}
        </div>
    )
}
