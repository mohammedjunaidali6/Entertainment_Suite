import React, { useState, useEffect, Fragment } from 'react';
import SearchBar from '../../common/searchBar/searchBar';
import Table from '../../common/reactTable/table';
import { columns, data } from './teamTempData';
import './team.css';
import { axiosInstance } from '../../../actions/axios-config';
import user from '../../../assets/img/user.svg';
import ActionMenu from '../../common/reactTable/menu';
import MessageBox from '../../common/MessageBox/MessageBox';

const roles = [
    { id: 1, permission: "Overview" },
    { id: 2, permission: "Engagements" },
    { id: 3, permission: "Live view" },
    { id: 4, permission: "Analytics" },
    { id: 5, permission: "Customer Segment" },
    { id: 6, permission: "Manage" },
    { id: 7, permission: "Admin" }
]
const headers = {
    client_id: 'identity_mgt',
    secret: 'XsrRvPkMHmXkkFeW'
}

export default function Team(props) {
    const [createClick, setCreateClick] = useState(false);
    const [updateUser, setUpdateUser] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [group, setGroup] = useState();
    const [message, setMessage] = useState('');
    const [roles, setRoles] = useState();
    const [users, setUsers] = useState();
    const [messageBox, setMessageBox] = useState({ display: false, type: '', text: '' });

    const onActionClick = (e, rowData) => {
        console.log('*', e.target.outerText, rowData);
        if (e.target.outerText === 'Edit') {
            setCreateClick(true);
            setEmail(rowData.email);
            //setPhoneNumber(rowData.mobile_number);
            setUpdateUser(rowData);
        } else if (e.target.outerText === 'Delete') {
            console.log('*', 'DELETE')
            axiosInstance.get('http://localhost:807/api/idty/deleteuser?user_id=' + rowData.user_id, { headers: headers })
                .then(response => {
                    if (response.status == 200 && response.data.data && response.data.data.length) {
                        let data = response.data.data;
                        console.log('*', data)
                        if (typeof data === 'string') {
                            console.error('***', data);
                            handleMessageBox('error', data);
                        } else {
                            handleMessageBox('success', 'User is deleted succesfully');
                        }
                    } else {
                        handleMessageBox('error', 'Deleting user is failed');
                    }
                })
                .catch(error => {
                    console.error('***', error);
                    handleMessageBox('error', error.toString());
                });
        }
    }

    const columns = [
        {
            name: "User Name",
            cell: row => <div>
                <img style={{
                    height: '36px',
                    width: '36px',
                    marginRight: '10px',
                    borderRadius: '10px',
                    display: 'inline-block'
                }}
                    src={row.imgSrc} />
                <div className='disp-inline-block'>{row.userName}</div>
            </div>
        },
        {
            name: "Email",
            selector: "email"
        },
        {
            name: "Role",
            selector: "role"
        },
        {
            name: "Status",
            selector: "status"
        },
        {
            name: "Actions",
            cell: row => <ActionMenu onAction={(e) => onActionClick(e, row)} />
        }
    ]

    function clickHandler() {
        setCreateClick(true);
        setUpdateUser();
        setEmail();
        setPhoneNumber();
    }
    const handleMessageBox = (messageType, textToDisplay) => {
        setMessageBox({ display: true, type: messageType, text: textToDisplay });
        setTimeout(() => setMessageBox({ display: false, type: '', text: '' }), 3000)
    }

    useEffect(() => {
        axiosInstance.get('http://localhost:807/api/idty/group/all')
            .then(response => {
                if (response.status == 200 && response.data.data && response.data.data.length) {
                    let data = response.data.data;
                    console.log('*', data)
                    if (typeof data === 'string') {
                        console.error('***', data);
                        setUsers();
                        handleMessageBox('error', data);
                    } else {
                        setRoles(data);
                    }
                } else {
                    setRoles(null);
                }
            })
            .catch(error => {
                console.error('***', error);
                setRoles(null);
                handleMessageBox('error', error.toString());
            });

        axiosInstance.get('http://localhost:807/api/idty/userbyfilter?pagesize=100', { headers: headers })
            .then(response => {
                if (response.status == 200 && response.data.data && response.data.data.length) {
                    console.log('*', response)
                    let data = response.data.data;
                    if (typeof data === 'string') {
                        console.error('***', data);
                        setUsers();
                        handleMessageBox('error', data);

                    } else {
                        let usersArr = [];
                        data.forEach(obj => {
                            let userObj = {};
                            userObj.user_id = obj.user_id;
                            userObj.userName = obj.user_name;
                            userObj.firstName = obj.first_name;
                            userObj.lastName = obj.last_name;
                            userObj.middleName = obj.middle_name;
                            userObj.imgSrc = user;
                            userObj.email = obj.email;
                            userObj.mobileNumber = obj.mobile_number;
                            userObj.role = obj.groups[0]?.name;
                            userObj.status = obj.is_enabled ? 'Active' : 'Inactive';
                            usersArr.push(userObj);
                        });
                        setUsers(usersArr);
                    }

                } else {
                    setUsers(null);
                }
            })
            .catch(error => {
                console.error('***', error);
                setUsers();
                handleMessageBox('error', error.toString());
            });


    }, [])

    const onEmailChange = e => {
        let mail = e.target.value;
        setEmail(mail)
    }
    const onPhoneNumberChange = e => {
        let phone = e.target.value;
        setPhoneNumber(phone)
    }
    const onGroupSelect = e => {
        let group = e.target.value;
        setGroup(group);
    }
    const IsEmailValid = (mail) => {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
            return (true)
        }
        //alert("You have entered an invalid email address!")
        return (false)
    }
    const IsPhoneNumberValid = number => {
        return number?.length === 10 ? true : false;
    }
    const onSaveClick = () => {
        if (!IsEmailValid(email)) {
            handleMessageBox('error', 'Email is invalid. Please check and try again');
        } else if (!IsPhoneNumberValid(phoneNumber)) {
            handleMessageBox('error', 'Phone number is invalid. Please check and try again');
        } else if (!group) {
            handleMessageBox('error', 'Please select atleast one role');
        } else {
            let postData = {};
            postData.email = email;
            postData.mobile_number = phoneNumber;
            postData.user_groups = [];
            postData.user_groups.push(group);
            postData.message = message;
            console.log('*', postData)
            axiosInstance.post('http://localhost:807/api/idty/admin/inviteuser', postData, { headers: headers })
                .then(response => {
                    console.log('***', response)
                    if (response.status == 200 && response.data.data) {
                        let data = response.data.data;
                        if (typeof data === 'string') {
                            console.error('***', data);
                            handleMessageBox('error', data);

                        } else {
                            setCreateClick(false);
                            setGroup();
                            setPhoneNumber();
                            setEmail();
                            handleMessageBox('success', 'Invitation sent succesfully');
                        }
                    } else {
                        //Invitation sent failed
                    }
                })
                .catch(error => {
                    console.error('***', error);
                    handleMessageBox('error', error.toString());
                })
        }
    }
    const onUpdateClick = () => {
        var postData = { ...updateUser };
        postData.groups = [];
        postData.groups.push(group);
        console.log('*', postData);
        axiosInstance.post('http://localhost:807/api/idty/updateuser', postData, { headers: headers })
            .then(response => {
                if (response.status == 200) {
                    let data = response.data.data;
                    if (typeof data === 'string') {
                        console.error('***', data);
                        handleMessageBox('error', data);
                    } else {
                        setCreateClick(false);
                        setUpdateUser(false);
                        handleMessageBox('success', 'User Group is Updated succesfully');
                    }
                } else {
                    //User Updated failed
                    setCreateClick(false);
                    handleMessageBox('error', 'User Group Update is failed');
                }
            })
            .catch(error => {
                console.error('***', error);
                handleMessageBox('error', error.toString());
            })
    }
    const onSearch = (username) => {
        console.log('***', username);
        if (username) {
            axiosInstance.get(`http://localhost:807/api/idty/userbyusername?user_name=${username}`, { headers: headers })
                .then(response => {
                    if (response.status == 200 && response.data.data && response.data.data.length) {
                        let usersArr = [];
                        response.data.data.forEach(obj => {
                            let userObj = {};
                            userObj.user_id = obj.user_id;
                            userObj.userName = obj.user_name;
                            userObj.firstName = obj.first_name;
                            userObj.lastName = obj.last_name;
                            userObj.middleName = obj.middle_name;
                            userObj.imgSrc = user;
                            userObj.email = obj.email;
                            userObj.mobileNumber = obj.mobile_number;
                            userObj.role = obj.groups[0]?.name;
                            userObj.status = obj.is_enabled ? 'Active' : 'Inactive';
                            usersArr.push(userObj);
                        });
                        setUsers(usersArr);
                    }
                })
                .catch(error => {
                    console.error('***', error);
                    handleMessageBox('error', error.toString());
                })
        } else {
            axiosInstance.get('http://localhost:807/api/idty/userbyfilter', { headers: headers })
                .then(response => {
                    if (response.status == 200 && response.data.data && response.data.data.length) {
                        let usersArr = [];
                        response.data.data.forEach(obj => {
                            let userObj = {};
                            userObj.user_id = obj.user_id;
                            userObj.userName = obj.user_name;
                            userObj.firstName = obj.first_name;
                            userObj.lastName = obj.last_name;
                            userObj.middleName = obj.middle_name;
                            userObj.imgSrc = user;
                            userObj.email = obj.email;
                            userObj.mobileNumber = obj.mobile_number;
                            userObj.role = obj.groups[0]?.name;
                            userObj.status = obj.is_enabled ? 'Active' : 'Inactive';
                            usersArr.push(userObj);
                        });
                        setUsers(usersArr);
                    } else {
                        setUsers(null);
                    }
                })
                .catch(error => {
                    console.error('***', error);
                    setUsers(null);
                    handleMessageBox('error', error.toString());
                });
        }

    }


    return (
        <Fragment>
            <div id="team-container">
                <MessageBox display={messageBox.display ? 'block' : 'none'} type={messageBox.type} text={messageBox.text} />
                {!createClick ? (
                    <div style={{ padding: '30px' }}>
                        <div className='team-management-header'>
                            <div className='t-m-title disp-inline-block'>TEAM MANAGEMENT</div>
                            <div className='t-m-create-btn disp-inline-block' onClick={clickHandler}>
                                <div className='t-m-create-btn-text'>+  Invite User</div>
                            </div>
                            <Table columns={columns}
                                data={users}
                                pagination={true}
                                subHeaderComponent={
                                    <SearchBar placeHolder="Search User" fromSettingsTeam={true} onSearch={(uname) => onSearch(uname)} />
                                }
                                subHeader={true}
                            />
                        </div>
                    </div>
                ) : (
                    <Fragment>
                        <div style={{ padding: '30px' }}>
                            <div className='invite-user-block'>
                                <div className='t-m-title'>{!updateUser ? 'Invite User' : 'Update Role'}</div>
                                <div className='t-m-input-block'>
                                    <div className='t-m-input disp-inline-block'>
                                        <div className='t-m-input-label'>E-mail*</div>
                                        <input
                                            type="email"
                                            className='t-m-input-field'
                                            placeholder='richard322@gmail.com'
                                            maxLength={20}
                                            onChange={onEmailChange}
                                            value={email}
                                            disabled={updateUser}
                                        />
                                    </div>
                                    <div className='t-m-input disp-inline-block'>
                                        <div className='t-m-input-label'>Mobile</div>
                                        <input
                                            type="text"
                                            className='t-m-input-field'
                                            placeholder='+91-9876545665'
                                            minLength={10}
                                            maxLength={10}
                                            onChange={onPhoneNumberChange}
                                            value={phoneNumber}
                                        />
                                    </div>
                                    <div className='t-m-input disp-inline-block'>
                                        <div className='t-m-input-label'>Role</div>
                                        <select className='t-m-input-field' placeholder="Select" onChange={onGroupSelect}>
                                            <option value=''>Select Role</option>
                                            {roles && roles.map(role =>
                                                <option value={role.group_id}>{role.name}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className='t-m-message-block'>
                                        <div className='t-m-input-label'>Message</div>
                                        <textarea className='t-m-message-box' placeholder="You’ve been invited to join Divinor Luckyme Dashbord. " onChange={e => setMessage(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='role-actions  clearfix'>
                            <div className='role-act-btn'>
                                <div className='role-cancel-btn disp-inline-block' role="button" onClick={() => { setCreateClick(false) }}>
                                    <div className='r-c-btn-text'>Cancel</div>
                                </div>
                                {!updateUser ?
                                    <div className='role-save-btn disp-inline-block' role="button" onClick={onSaveClick}>
                                        <div className='r-s-btn-text'>Invite</div>
                                    </div>
                                    :
                                    <div className='role-save-btn disp-inline-block' role="button" onClick={onUpdateClick}>
                                        <div className='r-s-btn-text'>Update</div>
                                    </div>
                                }
                            </div>
                        </div>
                    </Fragment>
                )
                }
            </div>
        </Fragment>
    )
}
