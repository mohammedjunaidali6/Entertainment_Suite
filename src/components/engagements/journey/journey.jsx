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
import { getAuthAndData, getData, postAuthAndData, postData } from '../../../api/ApiHelper';
import { ADD_JOURNEY_DETAILS, DELETE_JOURNEY_DETAILS, JOURNEYS, JOURNEYS_BY_SEARCH, JOURNEY_TASKS,SOMETHING_WENT_WRONG,UPDATE_JOURNEY_DETAILS } from '../../../api/apiConstants';
import { useHistory } from 'react-router-dom';
import createNotification from '../../common/reactNotification';
import { NotificationContainer } from 'react-notifications';


export default function EngagementsJourney(props) {
    var history = useHistory();
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [createFlag, setCreateFlag] = useState(false);
    const [updateFlag, setUpdateFlag] = useState(false);
    const [journeysCount, setJourneysCount] = useState({ usedInEngagements: 0, Total: 0 });
    const [journeysData, setJourneysData] = useState();
    const [journey, setJourney] = useState({ ID: 0, Name: '' });
    const [journeyTasks, setJourneyTasks] = useState();
    const [droppedItems, setDroppedItems] = useState();

    const journeyColumns = [
        {
            name: "Journey ID",
            selector: "JourneyID",
            width:'10%'
        },
        {
            name: "Journey Name",
            selector: "JourneyName",
            width:'40%'
        },
        {
            name: "Tasks Assigned",
            width:'20%',
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
            selector: "CreatedBy",
            width:'10%'
        },
        {
            name: "Created On",
            selector: "CreatedOn",
            width:'10%'
        },
        {
            name: " ",
            width:'10%',
            cell: rowObj => <ActionMenu onAction={e => onActionClick(e, rowObj)} />
        }

    ]

    const createClick = () => {
        setCreateFlag(true)
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
        if(e.target.value.length>2){
            return;
        }
        taskObj.value = e.target.value;
        let selectedTasks = [...droppedItems];
        let taskIndex = _.findIndex(selectedTasks, t => t.JourneyTaskID == taskObj.JourneyTaskID);
        selectedTasks.splice(taskIndex, 1, taskObj);
        setDroppedItems(selectedTasks);
    }

    const onJourneySave = () => {
        if(!journey?.name&&!droppedItems){
            createNotification('warning','Enter Journey Details');
            return;
        }
        var invalid=false;
        droppedItems?.forEach(itm=>{
            if(itm.NeedValue){
                    if(!itm.value||itm.value=='0'){
                        invalid=true;
                        return;
                    }
                }
        })
        if(invalid){
            createNotification('error','Please enter values for all required Journey tasks');
        } else {
            handleLoader(true);
            let journeyData = {
                JourneyName: journey.Name,
                JourneyTasks: droppedItems.map((task, ndx) => {
                    return {
                        JourneyTaskID: task.JourneyTaskID,
                        Value: task.value,
                        Order: ndx + 1
                    }
                })
            }
            postAuthAndData(`${ADD_JOURNEY_DETAILS}`, journeyData)
                .then(res => {
                    if (handleResponseCode(res)) {
                        getAllJourneys();
                        onCancel();
                        handleLoader(false);
                        createNotification('success', `${res.data.journey_name} Journey Created Succesfully`)
                    } else {
                        handleLoader(false);
                        createNotification('error', `Journey Creation is failed`)
                    }
                });
        }
    }

    const onJourneyUpdate = () => {
        handleLoader(true);
        let journeyData = {
            JourneyID: journey.ID,
            JourneyName: journey.Name,
            JourneyTasks: droppedItems.map((task, ndx) => {
                return {
                    JourneyTaskID: task.JourneyTaskID,
                    Value: task.value,
                    Order: ndx + 1
                }
            })
        }
        postAuthAndData(`${UPDATE_JOURNEY_DETAILS}`, journeyData, history)
            .then(res => {
                if (handleResponseCode(res)) {
                    getAllJourneys();
                    onCancel();
                    handleLoader(false);
                    createNotification('success', `${res.data.JourneyName} Journey Updated Succesfully`);
                } else {
                    handleLoader(false);
                    createNotification('error', `Journey Updating failed`);
                }
            })
    }

    const onCancel = () => {
        setCreateFlag(false);
        setUpdateFlag(false);
        setJourney({ ID: 0, Name: '' });
        setDroppedItems();
    }
    const getAllJourneys = () => {
        handleLoader(true);
        getAuthAndData(JOURNEYS, history)
            .then(res => {
                if (handleResponseCode(res)) {
                    setGroupedJourneys(res.data.JourneysResponse);
                    setJourneysCount({ usedInEngagements: res.data.UsedJourneysCount, Total: res.data.TotalJourneysCount });
                }
                handleLoader(false);
            });
    }
    const searchJourneyByName = (searchText) => {
        if (searchText) {
            getAuthAndData(`${JOURNEYS_BY_SEARCH}${searchText}`, history)
                .then(res => {
                    if (handleResponseCode(res)) {
                        setGroupedJourneys(res.data);
                    }
                });
        } else {
            getAllJourneys();
        }
    }
    const setGroupedJourneys = (journeys) => {
        var groupedJourneys = [];
        journeys.forEach(j => {
            var jrny = _.find(groupedJourneys, g => g.JourneyID == j.JourneyID);
            if (jrny) {
                jrny.JourneyTasks.push({
                    JourneyTaskID: j.JourneyTaskID,
                    JourneyTaskName: j.JourneyTaskName,
                    TaskValue: j.TaskValue,
                    TaskOrder: j.TaskOrder
                });
            } else {
                groupedJourneys.push({
                    JourneyID: j.JourneyID,
                    JourneyName: j.JourneyName,
                    CreatedBy: j.CreatedBy,
                    IsActive: j.IsActive,
                    JourneyTasks: [{
                        JourneyTaskID: j.JourneyTaskID,
                        JourneyTaskName: j.JourneyTaskName,
                        TaskValue: j.TaskValue,
                        TaskOrder: j.TaskOrder
                    }]
                });
            }
        })

        props.engagementsJourneyActionHandler.dispatchJourneysData(groupedJourneys);
        setJourneysData(groupedJourneys);
    }

    const getAllJourneyTasks = () => {
        handleLoader(true);
        getAuthAndData(JOURNEY_TASKS, history)
            .then(res => {
                if (handleResponseCode(res)) {
                    setJourneyTasks(res.data);
                    props.engagementsJourneyActionHandler.dispatchJourneyTasks(res.data);
                }
                handleLoader(false);
            });
    }

    const onActionClick = (e, rowObj) => {
        let action = e.target.outerText;
        if (action === 'Edit') {
            setUpdateFlag(true);
            setJourney({ ID: rowObj.JourneyID, Name: rowObj.JourneyName });
            var tasks = rowObj.JourneyTasks.length && rowObj.JourneyTasks.map(jTask => {
                var allJourneyTasks = [...props.allJourneyTasks]
                var getTask = _.find(allJourneyTasks, t => t.JourneyTaskID == jTask.JourneyTaskID);
                var allJourneys = [...props.allJourneysData];
                var getJourneyTask = _.find(_.find(allJourneys, t => t.JourneyID == rowObj.JourneyID)?.JourneyTasks, jt => jt.JourneyTaskID == jTask.JourneyTaskID);
                if (getTask) {
                    getTask.value = getJourneyTask?.TaskValue;
                    return getTask;
                }
            });
            setDroppedItems(tasks);
        } else if (action === 'Delete') {
            getAuthAndData(`${DELETE_JOURNEY_DETAILS}${rowObj.JourneyID}`, history)
                .then(res => {
                    if(handleResponseCode(res)){
                        getAllJourneys();
                        setUpdateFlag(false);
                        createNotification('success', `${rowObj.JourneyID} Journey Deleted Succesfully`);
                    }
                })
        } else {

        }
    }

    const handleResponseCode=(resp)=>{
        if(!resp || resp.code===-1){
            createNotification('error',SOMETHING_WENT_WRONG+ 'in Journeys');
            return false;
        }else{
            return true;
        }
    }

    useEffect(() => {
        getAllJourneys();
        getAllJourneyTasks();
    }, []);

    // useEffect(() => {
    //     return (() => {
    //         let journeyDetails = {
    //             JourneyName: journeyName,
    //             JourneyTasks: [...droppedItems || []]
    //         }
    //         props.engagementsJourneyActionHandler.dispatchJourneyDetails(journeyDetails);
    //     });
    // }, [journeyName, droppedItems]);


    return (
        <div id="engagements-journey-container">
            <NotificationContainer/>
            {(!createFlag && !updateFlag) ?
                <Fragment>
                    <div className='manage-journey-block'>
                        <div className='manage-journey mb-1'>Manage Journey</div>
                        <div className='manage-journey-text'>
                            {`${journeysCount.usedInEngagements}/${journeysCount.Total} Journey(s) are part of running Engagement`}
                        </div>
                    </div>
                    <div className='btn-create-journey float-right text-center pt-2' onClick={createClick}>
                        <span className="btn-c-j-text">+ Create Journey</span>
                    </div>
                    <div className='journey-table-block'>
                        {journeysData && journeysData.length > 0 && journeyColumns && journeyColumns.length > 0 &&
                            <Table 
                                columns={journeyColumns}
                                data={journeysData}
                                pagination={true}
                                subHeaderComponent={
                                    <SearchBar 
                                        placeHolder="Search by Journey Name" 
                                        onSearch={(searchStr) => searchJourneyByName(searchStr)} 
                                        fromJourney={true} 
                                        searchFilter="All Jouneys" 
                                    />
                                }
                                subHeader={true} 
                            />
                        }
                    </div>
                </Fragment>
                :
                <Fragment>
                    <div className="create-new-journey-container w-100 float-left clearfix" style={{ height: containerHeightCalcFn(186), overflowY: "auto" }}>
                        <div className='heading-c-j'>Create New Journey</div>
                        <div className="w-100 float-left clearfix">
                            <div className='journey-name-c-j w-100 float-left clearfix'>Journey Name</div>
                            <input
                                className='input-field-c-j w-50 float-left clearfix'
                                type="text"
                                placeholder="Enter Journey Name"
                                onChange={e => e.target.value?.length < 41 && setJourney({ ...journey, Name: e.target.value })}
                                value={journey.Name}
                            />
                        </div>
                        <div className="c-j-lbl-u-t w-100 float-left clearfix">User tasks</div>
                        <div className="dragable-tasks w-100 float-left clearfix">
                            {journeyTasks && journeyTasks.length > 0 ? (
                                <Fragment>
                                    {journeyTasks.map((taskObj) => (
                                        <div className="w-25 float-left clearfix" key={taskObj.JourneyTaskID} draggable={true} onDragOver={(event) => onDragOver(event)} onDragStart={(event) => onDragStart(event, taskObj)}>
                                            <div className="u-t-box w-97 float-left clearfix">
                                                <span className="u-t-box-h">{taskObj.JourneyTaskName}</span>
                                                <img src={three_dot_src} alt={taskObj.JourneyTaskName} />
                                                <img src={three_dot_src} alt={taskObj.JourneyTaskName} />
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
                                    <div className="w-25 float-left clearfix" key={taskObj.JourneyTaskID}>
                                        <div className="u-t-dropped-box w-97 float-left clearfix">
                                            <div className="u-t-dropped-box-h">
                                                <div className="u-t-dropped-box-h-lbl">{taskObj.JourneyTaskName.replace('{0}','')}</div>
                                            </div>
                                            <div className="u-t-dropped-box-sub-h">{taskObj.ValueQuestion}</div>
                                            <div>
                                                <input
                                                    type='number'
                                                    className="w-100 float-left clearfix"
                                                    styles={{ fontSize: "12px" }}
                                                    disabled={!taskObj.NeedValue}
                                                    maxLength={'2'}
                                                    onChange={e => onTaskValueChange(e, taskObj)}
                                                    value={taskObj.value || ''}
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
                            {createFlag &&
                                <div className="c-j-a-s content-c float-right clearfix" onClick={onJourneySave}>Save</div>
                            }
                            {updateFlag &&
                                <div className="c-j-a-s content-c float-right clearfix" onClick={onJourneyUpdate}>Update</div>
                            }
                            <div className="c-j-a-c content-c float-right clearfix" onClick={onCancel}>Cancel</div>
                        </div>
                    </div>
                    {/* <TaskDragDrop /> */}
                </Fragment>
            }
        </div>
    )
}
