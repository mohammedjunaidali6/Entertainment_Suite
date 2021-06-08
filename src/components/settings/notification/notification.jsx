import React, { useState, Fragment, useEffect } from 'react';
import Table from "../../common/reactTable/table";
import SearchBar from '../../common/searchBar/searchBar';
import { axiosInstance } from '../../../actions/axios-config';
import './notification.css';
import _ from 'lodash';
import ActionMenu from '../../common/reactTable/menu';
import MessageBox from '../../common/MessageBox/MessageBox';
import Loader from '../../common/Spinner/spinner';
import { headers } from '../../../api/apiConstants';


export default function Role(props) {
    const [messageBox, setMessageBox] = useState({ display: false, type: '', text: '' });
    const [visible, setVisible] = useState(false);
    const [updateRole, setUpdateRole] = useState();
    const [createClick, setCreateClick] = useState(false);
    const [roleData, setRoleData] = useState();
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
    const handleMessageBox = (messageType, textToDisplay) => {
        setMessageBox({ display: true, type: messageType, text: textToDisplay });
        setTimeout(() => setMessageBox({ display: false, type: '', text: '' }), 10000)
    }
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
            axiosInstance.get('http://localhost:807/api/idty/permissionsbygroup?group_id=' + rowData.groupID)
                .then(response => {
                    if (response.status == 200 && response.data.data && response.data.data.length) {
                        let data = response.data.data;
                        if (typeof data === 'string') {
                            console.error('***', data);
                            handleMessageBox('error', data);
                        } else {
                            let permissionsArr = [...permissions];
                            permissionsArr = permissionsArr.map(prm => {
                                prm.isAssigned = !!(_.find(data, p => prm.permission_id == p.permission_id))
                                return prm;
                            });
                            setPermissions(permissionsArr);
                        }
                    } else {
                        handleMessageBox('error', 'Group Permission fetch is failed');
                    }
                    setVisible(false);
                })
                .catch(error => {
                    console.error('***', error);
                    handleMessageBox('error', error.toString());
                    setVisible(false);
                });

        } else if (e.target.outerText === 'Delete') {
            deleteRole(rowData.groupID)
        }
    }
    const onViewClick = (e, rowData) => {
        setVisible(true);
        axiosInstance.get('http://localhost:807/api/idty/permissionsbygroup?group_id=' + rowData.groupID)
            .then(response => {
                if (response.status == 200 && response.data.data && response.data.data.length) {
                    let data = response.data.data;
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
            addRole(postData)
        }
    }
    const onUpdateRole = () => {
        var postData = {};
        postData.group_id = updateRole.groupID;
        postData.Permissions = [];
        postData.Permissions = permissions?.reduce((p, o) => (o.isAssigned && p.push(o.permission_id), p), []);
        updateRoles(postData);
    }

    const fetchRolesWithPermissionsCount = async () => {
        try {
            setVisible(true);
            const response = await axiosInstance.get('http://localhost:807/api/idty/getgroups', { headers: headers });
            console.log('***', response)
            if (response.status == 200 && typeof response.data.data !== 'string') {
                let roleArr = [];
                response.data.data.forEach(r => {
                    let roleObj = {};
                    roleObj.groupID = r.GroupID;
                    roleObj.role = r.GroupName;
                    roleObj.permissions = r.PermissionCount + ' Permissions';
                    roleArr.push(roleObj);
                })
                roleArr = roleArr.sort((a, b) => a.role < b.role ? -1 : 1);
                props.notificationActionHandler.setRolesWithPermissionCount(roleArr);
            }
        } catch (error) {
            console.error(error)
        }
        setVisible(false);
    }
    const fetchPermissions = async () => {
        try {
            setVisible(true);
            const response = await axiosInstance.get('http://localhost:807/api/idty/permission/all');
            if (response.status == 200 && typeof response.data.data !== 'string') {
                props.notificationActionHandler.setPermissions(response.data.data);
                setPermissions(response.data.data)
            }
        } catch (error) {
            console.error(error)
        }
        setVisible(false);
    }
    const updateRoles = async (postData) => {
        try {
            setVisible(true);
            const response = await axiosInstance.post('http://localhost:807/api/idty/updategroup', postData, { headers: headers });
            if (response.status == 200 && typeof response.data.data !== 'string') {
                setCreateClick(false);
                setUpdateRole();
                let roleObj = {};
                roleObj.groupID = postData.group_id;
                roleObj.role = updateRole.role;
                roleObj.permissions = postData.Permissions.length + ' Permissions';
                let rolesArr = props.roleData;
                rolesArr.splice(_.findIndex(rolesArr, r => r.groupID == roleObj.groupID), 1, roleObj);
                rolesArr = rolesArr.sort((a, b) => a.role < b.role ? -1 : 1);
                props.notificationActionHandler.setRolesWithPermissionCount(rolesArr)
                handleMessageBox('success', 'User Group is Updated succesfully');
            } else {
                handleMessageBox('error', 'User Group Update is failed');
            }
        } catch (error) {
            console.error(error);
            handleMessageBox('error', error.message);
        }
        setVisible(false);
    }
    const searchRoleByRoleName = async (rolename) => {
        try {
            setVisible(true);
            const response = await axiosInstance.get(`http://localhost:807/api/idty/groupbygroupname?group_name=${rolename}`, { headers: headers })
            let data = response.data.data;
            let roleArr = [];
            if (response.status == 200 && typeof data !== 'string') {
                data.forEach(r => {
                    let roleObj = {};
                    roleObj.groupID = r.GroupID;
                    roleObj.role = r.GroupName;
                    roleObj.permissions = r.PermissionCount;
                    roleArr.push(roleObj);
                })
                roleArr = roleArr.sort((a, b) => a.role < b.role ? -1 : 1);
                console.log('***', roleArr)
                props.notificationActionHandler.setRolesWithPermissionCount(roleArr);
            }
        } catch (error) {
            console.error(error);
        }
        setVisible(false);
    }
    const addRole = async (postData) => {
        try {
            setVisible(true);
            const response = await axiosInstance.post('http://localhost:807/api/idty/addnewgroup', postData, { headers: headers });
            if (response.status === 200 && typeof response.data.data !== 'string') {
                setCreateClick(false);
                let data = response.data.data;
                let rolesArr = props.roleData;
                let roleObj = {};
                roleObj.groupID = data.group_id;
                roleObj.role = postData.Name;
                roleObj.permissions = postData.Permissions.length + ' Permissions';
                rolesArr.push(roleObj);
                props.notificationActionHandler.setRolesWithPermissionCount(rolesArr)
                handleMessageBox('success', 'Role added succesfully');
            } else {
                handleMessageBox('error', 'Adding Role is failed');
            }
        } catch (error) {
            console.error(error)
            handleMessageBox('error', error.message);
        }
        setVisible(false);
    }
    const deleteRole = async (id) => {
        try {
            setVisible(true);
            const response = await axiosInstance.get('http://localhost:807/api/idty/deletegroup?group_id=' + id, { headers: headers });
            if (response.status == 200 && typeof response.data.data !== 'string') {
                let tempRoles = [...props.roleData];
                tempRoles.splice(_.findIndex(tempRoles, r => r.groupID == id), 1);
                props.notificationActionHandler.setRolesWithPermissionCount(tempRoles)
                handleMessageBox('success', 'Group is deleted succesfully');
            } else {
                handleMessageBox('error', 'Deleting Group is failed');
            }
        } catch (error) {
            console.error(error)
            handleMessageBox('error', error.message);
        }
        setVisible(false);
    }
    const permissionsByGroupId = async (id) => {
        try {
            const response = await axiosInstance.get('http://localhost:807/api/idty/permissionsbygroup?group_id=' + id);


        } catch (error) {
            console.error(error)
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
                    <MessageBox display={messageBox.display ? 'block' : 'none'} type={messageBox.type} text={messageBox.text} />
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
