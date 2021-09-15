import React, { useState, Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Table from "../../common/reactTable/table";
import SearchBar from '../../common/searchBar/searchBar';
import './role.css';
import _ from 'lodash';
import ActionMenu from '../../common/reactTable/menu';
import Loader from '../../common/Spinner/spinner';
import { getAuthAndData, getData, postAuthAndData, postData } from '../../../api/ApiHelper';
import {
    IDTY_PROD_HOST_URI,
    ADD_NEWGROUP, UPDATE_GROUP, DELETE_GROUP,
    GET_GROUPS, GROUP_BY_GROUPNAME,
    PERMISSION_ALL, PERMISSION_BY_GROUP, SOMETHING_WENT_WRONG,
} from '../../../api/apiConstants';
import createNotification from '../../common/reactNotification';
import { NotificationContainer } from 'react-notifications';

export default function Role(props) {
    var history = useHistory();
    const [visible, setVisible] = useState(false);
    const [updateRole, setUpdateRole] = useState();
    const [createClick, setCreateClick] = useState(false);
    const [roleName, setRoleName] = useState();
    const [permissions, setPermissions] = useState(props.permissions);
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
    function clickHandler() {
        setPermissions(permissions.map(p => {
            p.isAssigned = true
            return p;
        }));
        setRoleName();
        setUpdateRole()
        setCreateClick(true);
    }
    function permissionBoxClick(boxData) {
        let perms = [...permissions];
        boxData.isAssigned = !boxData.isAssigned;
        perms.splice(_.findIndex(perms, p => p.permission_id == boxData.permission_id), 1, boxData);
        setPermissions(perms);
    }
    const onSearch = (rname) => {
        setVisible(true);
        if (rname) {
            searchRoleByRoleName(rname);
        } else {
            fetchRolesWithPermissionsCount();
        }
    }
    const onActionClick = (e, rowData) => {
        if (e.target.outerText === 'Edit') {
            setCreateClick(true);
            setUpdateRole(rowData)
            setRoleName(rowData.role);
            getAuthAndData(`${IDTY_PROD_HOST_URI}${PERMISSION_BY_GROUP}${rowData.groupID}`, history)
                .then(res => {
                    if (handleResponseCode(res)) {
                        let permissionsArr = [...permissions];
                        permissionsArr = permissionsArr.map(prm => {
                            prm.isAssigned = !!(_.find(res.data, p => prm.permission_id == p.permission_id))
                            return prm;
                        });
                        setPermissions(permissionsArr);
                    } else {
                        createNotification('error', 'Group Permission fetch is failed');
                    }
                    setVisible(false);
                });

        } else if (e.target.outerText === 'Delete') {
            deleteRole(rowData.groupID)
        }
    }
    const onViewClick = (e, rowData) => {
        setVisible(true);
        getAuthAndData(`${IDTY_PROD_HOST_URI}${PERMISSION_BY_GROUP}${rowData.groupID}`, history)
            .then(res => {
                if (handleResponseCode(res)) {
                    createNotification('success', 'Group Permission fetched succesfully');
                    setGroupPermissions(res.data);
                } else {
                    createNotification('error', 'Group Permission fetch is failed');
                    setGroupPermissions();
                }
                setVisible(false);
            });
    }
    const onSaveRole = () => {
        if (!roleName) {
            createNotification('error', 'Role name is required');
        } else {
            let postObj = {};
            postObj.Name = roleName;
            postObj.Description = description;
            postObj.Permissions = permissions?.reduce((p, o) => (o.is_enabled && p.push(o.permission_id), p), []);
            addRole(postObj)
        }
    }
    const onUpdateRole = () => {
        var postObj = {};
        postObj.group_id = updateRole.groupID;
        postObj.Permissions = [];
        postObj.Permissions = permissions?.reduce((p, o) => (o.isAssigned && p.push(o.permission_id), p), []);
        updateRoles(postObj);
    }

    const fetchRolesWithPermissionsCount = async () => {
        try {
            setVisible(true);
            getAuthAndData(`${IDTY_PROD_HOST_URI}${GET_GROUPS}`, history)
                .then(res => {
                    if (handleResponseCode(res)) {
                        let roleArr = [];
                        res.data.forEach(r => {
                            let roleObj = {};
                            roleObj.groupID = r.GroupID;
                            roleObj.role = r.GroupName;
                            roleObj.permissions = r.PermissionCount + ' Permissions';
                            roleArr.push(roleObj);
                        })
                        roleArr = roleArr.sort((a, b) => a.role < b.role ? -1 : 1);
                        props.notificationActionHandler.setRolesWithPermissionCount(roleArr);
                    }
                })
        } catch (error) {
            console.error(error)
        }
        setVisible(false);
    }
    const fetchPermissions = async () => {
        try {
            setVisible(true);
            getAuthAndData(`${IDTY_PROD_HOST_URI}${PERMISSION_ALL}`, history)
                .then(res => {
                    if (handleResponseCode(res)) {
                        props.notificationActionHandler.setPermissions(res.data);
                        setPermissions(res.data)
                    }
                })
        } catch (error) {
            console.error(error)
        }
        setVisible(false);
    }
    const updateRoles = async (postObj) => {
        try {
            setVisible(true);
            postAuthAndData(`${IDTY_PROD_HOST_URI}${UPDATE_GROUP}`, postObj, history)
                .then(res => {
                    if (handleResponseCode(res)) {
                        setCreateClick(false);
                        setUpdateRole();
                        let roleObj = {};
                        roleObj.groupID = postObj.group_id;
                        roleObj.role = updateRole.role;
                        roleObj.permissions = postObj.Permissions.length + ' Permissions';
                        let rolesArr = props.roleData;
                        rolesArr.splice(_.findIndex(rolesArr, r => r.groupID == roleObj.groupID), 1, roleObj);
                        rolesArr = rolesArr.sort((a, b) => a.role < b.role ? -1 : 1);
                        props.notificationActionHandler.setRolesWithPermissionCount(rolesArr)
                        createNotification('success', 'User Group is Updated succesfully');
                    } else {
                        createNotification('error', 'User Group Update is failed');
                    }
                })
        } catch (error) {
            console.error(error);
            createNotification('error', error.message);
        }
        setVisible(false);
    }
    const searchRoleByRoleName = async (rolename) => {
        try {
            setVisible(true);
            getAuthAndData(`${IDTY_PROD_HOST_URI}${GROUP_BY_GROUPNAME}${rolename}`, history)
                .then(res => {
                    if (handleResponseCode(res)) {
                        let roleArr = [];
                        res.data.forEach(r => {
                            let roleObj = {};
                            roleObj.groupID = r.GroupID;
                            roleObj.role = r.GroupName;
                            roleObj.permissions = r.PermissionCount;
                            roleArr.push(roleObj);
                        })
                        roleArr = roleArr.sort((a, b) => a.role < b.role ? -1 : 1);
                        props.notificationActionHandler.setRolesWithPermissionCount(roleArr);
                    } else {

                    }
                })
        } catch (error) {
            console.error(error);
        }
        setVisible(false);
    }
    const addRole = async (postObj) => {
        try {
            setVisible(true);
            postAuthAndData(`${IDTY_PROD_HOST_URI}${ADD_NEWGROUP}`, postObj, history)
                .then(res => {
                    if (handleResponseCode(res)) {
                        setCreateClick(false);
                        let rolesArr = props.roleData;
                        let roleObj = {};
                        roleObj.groupID = res.data.group_id;
                        roleObj.role = postObj.Name;
                        roleObj.permissions = postObj.Permissions.length + ' Permissions';
                        rolesArr.push(roleObj);
                        props.notificationActionHandler.setRolesWithPermissionCount(rolesArr)
                        createNotification('success', 'Role added succesfully');
                    } else {
                        createNotification('error', 'Adding Role is failed');
                    }
                })
        } catch (error) {
            console.error(error)
            createNotification('error', error.message);
        }
        setVisible(false);
    }
    const deleteRole = async (id) => {
        try {
            setVisible(true);
            getAuthAndData(`${IDTY_PROD_HOST_URI}${DELETE_GROUP}${id}`, history)
                .then(res => {
                    if (handleResponseCode(res)) {
                        let tempRoles = [...props.roleData];
                        tempRoles.splice(_.findIndex(tempRoles, r => r.groupID == id), 1);
                        props.notificationActionHandler.setRolesWithPermissionCount(tempRoles)
                        createNotification('success', 'Group is deleted succesfully');
                    } else {
                        createNotification('error', 'Deleting Group is failed');
                    }
                })
        } catch (error) {
            console.error(error)
            createNotification('error', error.message);
        }
        setVisible(false);
    }

    const handleResponseCode=(resp)=>{
        if(!resp || resp.code===-1){
            createNotification('error',SOMETHING_WENT_WRONG+' in Roles');
            return false;
        } else {
            return true;
        }
    }

    useEffect(() => {
        fetchRolesWithPermissionsCount();
        fetchPermissions();
    }, [])

    return (
        <Fragment>
            {visible ?
                <Loader />
                :
                <div id="role-container">
                    <NotificationContainer/>
                    {!createClick ?
                        (<Fragment>
                            <div style={{ padding: '35px 45px ' }}>
                                <div className='role-header'>
                                    <div className='role-title disp-inline'>TEAM MANAGEMENT</div>
                                    <div className='add-new-role-btn disp-inline' role="button" onClick={clickHandler}>
                                        <div className='add-new-role'>+ Add New Role</div>
                                    </div>
                                </div>
                                <Table columns={column}
                                    data={props.roleData}
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
                                    <div className='role-title'>{updateRole ? 'UPDATE ROLE' : 'CREATE ROLE'}</div>
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
                                            <div className={`r-p-list-item ${obj.isAssigned ? `selectedBox` : ``}`} onClick={() => permissionBoxClick(obj)}>
                                                <input
                                                    type="checkbox"
                                                    className={`dips-inline-block r-checkbox ${obj.isAssigned ? ` r-checked` : `r-checked-out `}`}
                                                    checked={obj.isAssigned}
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
