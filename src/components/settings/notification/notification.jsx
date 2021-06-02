import React, { useState, Fragment, useEffect } from 'react';
import Table from "../../common/reactTable/table";
import { data, column } from "./tempData";
import PermissionList from "./permissionContainer";
import SearchBar from '../../common/searchBar/searchBar';
import { axiosInstance } from '../../../actions/axios-config';
import './notification.css';
import _ from 'lodash';
import ActionMenu from '../../common/reactTable/menu';
import MessageBox from '../../common/MessageBox/MessageBox';
import Loader from '../../common/Spinner/spinner';

const rolePermissionData = [
    { id: 1, permission: "Overview", isActive: true },
    { id: 2, permission: "Engagements", isActive: false },
    { id: 3, permission: "Live view", isActive: true },
    { id: 4, permission: "Analytics", isActive: false },
    { id: 5, permission: "Customer Segment", isActive: false },
    { id: 6, permission: "Manage", isActive: true },
    { id: 7, permission: "Admin", isActive: true }
]
const headers = {
    client_id: 'identity_mgt_tenant_2',
    secret: 'XsrRvPkMHmXkkFeW'
}

export default function Role(props) {
    const [messageBox, setMessageBox] = useState({ display: false, type: '', text: '' });
    const [visible, setVisible] = useState(false);
    const [updateRole, setUpdateRole] = useState();
    const [createClick, setCreateClick] = useState(false);
    const [roleData, setRoleData] = useState();
    const [roleName, setRoleName] = useState();
    const [permissions, setPermissions] = useState();
    const [groupPermissions, setGroupPermissions] = useState();
    const [description, setDescription] = useState();

    const column = [
        {
            name: "Role",
            selector: "role"
        },
        {
            name: "Permissions",
            cell: row => <div>
                <div className='disp-inline'>{row.permissions}</div>
                <button className='disp-inline table-row-btn' onClick={e => onViewClick(e, row)} style={{ marginLeft: '10px' }}>
                    <div className='table-row-btn-text'>View</div>
                </button>
            </div>

        },
        {
            name: "Actions",
            cell: row => <ActionMenu onAction={(e) => onActionClick(e, row)} />
        }
    ]
    const handleMessageBox = (messageType, textToDisplay) => {
        setMessageBox({ display: true, type: messageType, text: textToDisplay });
        setTimeout(() => setMessageBox({ display: false, type: '', text: '' }), 10000)
    }
    function clickHandler() {
        setRoleName();
        setUpdateRole()
        setCreateClick(true);
    }
    function permissionBoxClick(boxData) {
        let perms = [...permissions];
        boxData.is_enabled = !boxData.is_enabled;
        perms.splice(_.findIndex(perms, p => p.permission_id == boxData.permission_id), 1, boxData);
        setPermissions(perms);
    }
    const onSearch = (rname) => {
        setVisible(true);
        if (rname) {
            axiosInstance.get(`http://localhost:807/api/idty/groupbygroupname?group_name=${rname}`, { headers: headers })
                .then(response => {
                    let data = response.data.data;
                    let roleArr = [];
                    if (response.status == 200) {
                        data.forEach(r => {
                            let roleObj = {};
                            roleObj.groupID = r.GroupID;
                            roleObj.role = r.GroupName;
                            roleObj.permissions = r.PermissionCount;
                            roleArr.push(roleObj);
                        })
                        setRoleData(roleArr);
                    } else {
                        setRoleData(null);
                    }
                    setVisible(false);
                })
                .catch(error => {
                    console.error('*', error);
                    setRoleData(null);
                    setVisible(false);
                });
        } else {
            axiosInstance.get('http://localhost:807/api/idty/getgroups', { headers: headers })
                .then(response => {
                    let data = response.data.data;
                    let roleArr = [];
                    if (response.status == 200) {
                        data.forEach(r => {
                            let roleObj = {};
                            roleObj.groupID = r.GroupID;
                            roleObj.role = r.GroupName;
                            roleObj.permissions = r.PermissionCount;
                            roleArr.push(roleObj);
                        })
                        setRoleData(roleArr);
                    } else {
                        setRoleData(null);
                    }
                    setVisible(false);
                })
                .catch(error => {
                    console.error('*', error);
                    setRoleData(null);
                    setVisible(false);
                });
        }

    }
    const onActionClick = (e, rowData) => {
        console.log('*', e.target.outerText, rowData);
        if (e.target.outerText === 'Edit') {
            setCreateClick(true);
            setUpdateRole(rowData)
            setRoleName(rowData.role);
        } else if (e.target.outerText === 'Delete') {
            setVisible(true);
            axiosInstance.get('http://localhost:807/api/idty/deletegroup?group_id=' + rowData.groupID, { headers: headers })
                .then(response => {
                    if (response.status == 200 && response.data.data && response.data.data.length) {
                        let data = response.data.data;
                        console.log('*', data)
                        if (typeof data === 'string') {
                            console.error('***', data);
                            handleMessageBox('error', data);
                        } else {
                            handleMessageBox('success', 'Group is deleted succesfully');
                        }
                    } else {
                        handleMessageBox('error', 'Deleting Group is failed');
                    }
                    setVisible(false);
                })
                .catch(error => {
                    console.error('***', error);
                    handleMessageBox('error', error.toString());
                    setVisible(false);
                });
        }
    }
    const onViewClick = (e, rowData) => {
        setVisible(true);
        axiosInstance.get('http://localhost:807/api/idty/permissionsbygroup?group_id=' + rowData.groupID)
            .then(response => {
                if (response.status == 200 && response.data.data && response.data.data.length) {
                    let data = response.data.data;
                    console.log('*', data)
                    if (typeof data === 'string') {
                        console.error('***', data);
                        handleMessageBox('error', data);
                    } else {
                        handleMessageBox('success', 'Group Permission fetched succesfully');
                        setGroupPermissions(data);
                    }
                } else {
                    handleMessageBox('error', 'Group Permission fetch is failed');
                    setGroupPermissions();
                }
                setVisible(false);
            })
            .catch(error => {
                console.error('***', error);
                handleMessageBox('error', error.toString());
                setGroupPermissions();
                setVisible(false);
            });
    }
    const onSaveRole = () => {
        if (!roleName) {
            handleMessageBox('error', 'Role name is required');
        } else {
            let postData = {};
            postData.Name = roleName;
            postData.Description = description;
            postData.Permissions = permissions?.reduce((p, o) => (o.is_enabled && p.push(o.permission_id), p), []);
            setVisible(true);
            axiosInstance.post('http://localhost:807/api/idty/addnewgroup', postData, { headers: headers })
                .then(response => {
                    if (response.status == 200 && response.data.data) {
                        let data = response.data.data;
                        if (typeof data === 'string') {
                            console.error('***', data);
                            handleMessageBox('error', data);
                        } else {
                            setCreateClick(false);
                            handleMessageBox('success', 'Group created succesfully');
                        }
                    } else {
                        handleMessageBox('error', response.data.message);
                        //Invitation sent failed
                    }
                    setVisible(false);
                })
                .catch(error => {
                    console.error('***', error);
                    handleMessageBox('error', error.toString());
                    setVisible(false);
                })
        }
    }
    const onUpdateRole = () => {
        var postData = {};
        postData.group_id = updateRole.groupID;
        postData.Permissions = [];
        postData.Permissions = permissions?.reduce((p, o) => (o.is_enabled && p.push(o.permission_id), p), []);
        setVisible(true);
        axiosInstance.post('http://localhost:807/api/idty/updategroup', postData, { headers: headers })
            .then(response => {
                if (response.status == 200) {
                    let data = response.data.data;
                    if (typeof data === 'string') {
                        console.error('***', data);
                        handleMessageBox('error', data);
                    } else {
                        setCreateClick(false);
                        setUpdateRole();
                        let roleObj = {};
                        roleObj.groupID = postData.group_id;
                        roleObj.role = updateRole.role;
                        roleObj.permissions = postData.Permissions.length;
                        let rolesArr = [...roleData];
                        rolesArr.splice(_.findIndex(rolesArr, r => r.groupID == roleObj.groupID), 1, roleObj);
                        setRoleData(rolesArr);
                        handleMessageBox('success', 'User Group is Updated succesfully');
                    }
                } else {
                    //User Updated failed
                    setCreateClick(false);
                    handleMessageBox('error', 'User Group Update is failed');
                }
                setVisible(false);
            })
            .catch(error => {
                console.error('***', error);
                handleMessageBox('error', error.toString());
                setVisible(false);
            })
    }

    useEffect(() => {
        setVisible(true);
        axiosInstance.get('http://localhost:807/api/idty/getgroups', { headers: headers })
            .then(response => {
                let data = response.data.data;
                let roleArr = [];
                if (response.status == 200) {
                    data.forEach(r => {
                        let roleObj = {};
                        roleObj.groupID = r.GroupID;
                        roleObj.role = r.GroupName;
                        roleObj.permissions = r.PermissionCount;
                        roleArr.push(roleObj);
                    })
                    setRoleData(roleArr);
                    setVisible(false);
                } else {
                    setRoleData(null);
                    setVisible(false);
                }
            })
            .catch(error => {
                console.error('*', error);
                setRoleData(null);
                setVisible(false);
            });

        axiosInstance.get('http://localhost:807/api/idty/permission/all')
            .then(response => {
                let permissionsArr = response.data.data;
                if (response.status == 200) {
                    setPermissions(permissionsArr);
                } else {
                    setPermissions(null);
                }
            })
            .catch(error => {
                console.error('*', error);
                setPermissions(null);
            });
    }, [])

    return (
        <Fragment>
            {visible ?
                <Loader />
                :
                <div id="role-container">
                    <MessageBox display={messageBox.display ? 'block' : 'none'} type={messageBox.type} text={messageBox.text} />
                    {!createClick ?
                        (<Fragment>
                            <div style={{ padding: '35px 45px ' }}><div className='role-header'>
                                <div className='role-title disp-inline'>TEAM MANAGEMENT</div>
                                <div className='add-new-role-btn disp-inline' role="button" onClick={clickHandler}>
                                    <div className='add-new-role'>+ Add New Role</div>
                                </div>
                            </div>
                                <Table columns={column}
                                    data={roleData}
                                    pagination={true}
                                    subHeaderComponent={
                                        <SearchBar placeHolder="Search Role" fromSettingsTeam={true} onSearch={(rname) => onSearch(rname)} />
                                    }
                                    subHeader={true}
                                />
                            </div>
                        </Fragment>
                        )
                        : (<Fragment>
                            <div style={{ padding: '35px 45px' }}>
                                <div className='role-header'>
                                    {!updateRole ?
                                        <div className='role-title'>CREATE ROLE</div>
                                        :
                                        <div className='role-title'>UPDATE ROLE</div>
                                    }
                                </div>
                                <div className='role-name'>
                                    <div className='t-m-input-label'>Role Name</div>
                                    <input
                                        type="text"
                                        className='r-input-field'
                                        placeholder='Campaign Manager'
                                        maxLength={40}
                                        onChange={e => setRoleName(e.target.value)}
                                        value={roleName}
                                        disabled={updateRole}
                                    />
                                </div>
                                <div className='role-permissions'>
                                    <div className='t-m-input-label'>Permissions</div>
                                    <div className='r-permissions-list'>
                                        {permissions?.map(obj => (
                                            <div className={`r-p-list-item ${obj.is_enabled ? `selectedBox` : ``}`} onClick={() => permissionBoxClick(obj)}>
                                                <input
                                                    type="checkbox"
                                                    className={`dips-inline-block r-checkbox ${obj.is_enabled ? ` r-checked` : `r-checked-out `}`}
                                                    checked={obj.is_enabled}
                                                />
                                                <div className='r-p-item-text disp-inline-block'>{obj.description}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='role-description'>
                                    <div className='t-m-input-label'>Description</div>
                                    <textarea
                                        className='role-description-box'
                                        placeholder="Add Note"
                                        maxLength={200}
                                        onChange={e => setDescription(e.target.value)}
                                        value={description}
                                    >
                                    </textarea>
                                </div>
                            </div>
                            <div className='role-actions  clearfix'>
                                <div className='role-act-btn'>
                                    <div className='role-cancel-btn disp-inline-block' role="button" onClick={() => { setCreateClick(false) }}>
                                        <div className='r-c-btn-text'>Cancel</div>
                                    </div>
                                    {!updateRole ?
                                        <div className='role-save-btn disp-inline-block' role="button" onClick={onSaveRole}>
                                            <div className='r-s-btn-text'>Save</div>
                                        </div>
                                        :
                                        <div className='role-save-btn disp-inline-block' role="button" onClick={onUpdateRole}>
                                            <div className='r-s-btn-text'>Update</div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </Fragment>
                        )}
                </div>
            }
        </Fragment>

    )
}
