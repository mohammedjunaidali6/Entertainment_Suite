import React from 'react';
import CustomTooltip from "../../common/tooltip/tooltip";
import ActionMenu from "../../common/reactTable/menu";



export const journeyColumns = [
        {
            name:"ID",
            selector:"id"
        },
        {
            name:"Journey Name",
            selector:"journeyName"
        },
        {
            name:"Goals",
            selector:"goals"
        },
        {
            name:"Task assigned",
            // selector:"taskAssigned",
             cell: rowObj => 
             <div style={{ paddingRight:'5px'}}>
                 <div>{rowObj.taskAssigned}</div>
                 <CustomTooltip tooltipText={rowObj.tooltipText} >
                    <button type="button" className='table-row-btn'>
                        <div className='table-row-btn-text'>3+</div>
                    </button>        
                  </CustomTooltip>    
            </div>
        },
        {
            name:"Created by",
            selector:"createdBy"
        },
        {
            name:"Status",
            selector:"status"
        },
        {
            name: " ",
             cell: action=> <ActionMenu />
        }
        
    ]

export const journeyData= [
        {
            id:"3456789",
            journeyName:"First Purchase User's Journey",
            goals:"First Purchase User's goals",
            taskAssigned: "Login to the app",
            createdBy: "User Name",
            status: "Active",
            tooltipText:"Push items into cart > Buy item "
        },
        {
            id:"3456790",
            journeyName:"First Purchase User's Journey",
            goals:"First Purchase User's goals",
            taskAssigned: "Login to the app",
            createdBy: "User Name",
            status: "Inctive",
            tooltipText:"Push items into cart > Buy item "
        },
        {
            id:"3456791",
            journeyName:"First Purchase User's Journey",
            goals:"First Purchase User's goals",
            taskAssigned: "Login to the app",
            createdBy: "User Name",
            status: "Active",
            tooltipText:"Push items into cart > Buy item "
        },
        {
            id:"3456792",
            journeyName:"First Purchase User's Journey",
            goals:"First Purchase User's goals",
            taskAssigned: "Login to the app",
            createdBy: "User Name",
            status: "Active",
            tooltipText:"Push items into cart > Buy item "
        },
        {
            id:"3456793",
            journeyName:"First Purchase User's Journey",
            goals:"First Purchase User's goals",
            taskAssigned: "Login to the app",
            createdBy: "User Name",
            status: "Iactive",
            tooltipText:"Push items into cart > Buy item "
        }
    ]
