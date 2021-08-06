import React, { useState, useEffect, Fragment } from 'react';
import SearchBar from '../../common/searchBar/searchBar';
import Table from '../../common/reactTable/table';
import './team.css';
import user from '../../../assets/img/user.svg';
import ActionMenu from '../../common/reactTable/menu';
import MessageBox from '../../common/MessageBox/MessageBox';
import Loader from '../../common/Spinner/spinner';
import { getAuthAndData, getData, postAuthAndData, postData } from '../../../api/ApiHelper';
import { DELETE_USER, GROUP_ALL, IDTY_PROD_HOST_URI, INVITE_USER, UPDATE_USER, USER_BY_FILTERS, USER_BY_MAIL, USER_BY_USERNAME } from '../../../api/apiConstants';
import validator from 'validator';
import AWS from 'aws-sdk';
import { useHistory } from 'react-router-dom';


export default function Team(props) {
    var history = useHistory();
    const {
        REACT_APP_AWS_REGION,
        REACT_APP_IAM_ACCESS_KEY,
        REACT_APP_IAM_SECRET,
        REACT_APP_POOL_ID
    } = process.env;
    const [visible, setVisible] = useState(false);
    const [messageBox, setMessageBox] = useState({ display: false, type: '', text: '' });
    const [createClick, setCreateClick] = useState(false);
    const [updateUser, setUpdateUser] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [group, setGroup] = useState();
    const [message, setMessage] = useState('');
    var smallChars = 'abcdefghijklmnopqrstuvwxyz';
    var numbers = '0123456789';
    var bigChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var specialChars = '@#$&!';

    const onActionClick = (e, rowData) => {
        if (e.target.outerText === 'Edit') {
            setCreateClick(true);
            setEmail(rowData.email);
            //setPhoneNumber(rowData.mobile_number);
            setUpdateUser(rowData);
        } else if (e.target.outerText === 'Delete') {
            setVisible(true);
            getAuthAndData(`${IDTY_PROD_HOST_URI}${DELETE_USER}${rowData.user_id}`, history)
                .then(data => {
                    if (data) {
                        handleMessageBox('success', 'User is deleted succesfully');
                    } else {
                        handleMessageBox('error', 'Deleting user is failed');
                    }
                    setVisible(false);
                })
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
        setTimeout(() => setMessageBox({ display: false, type: '', text: '' }), 5000)
    }

    const fetchRolesData = () => {
        try {
            setVisible(true);
            getAuthAndData(`${IDTY_PROD_HOST_URI}${GROUP_ALL}`, history)
                .then(response => {
                    if (response) {
                        let rolesArr = response.sort((a, b) => a.name < b.name ? -1 : 1);
                        props.teamActionHandler.get_Roles(rolesArr);
                    } else {

                    }
                })
        } catch (error) {
            console.error(error)
        }
        setVisible(false);
    }
    const fetchUsersData = () => {
        try {
            setVisible(true);
            getAuthAndData(`${IDTY_PROD_HOST_URI}${USER_BY_FILTERS}${100}`, history)
                .then(response => {
                    if (response) {
                        let usersArr = [];
                        Array.isArray(response) && response?.forEach(obj => {
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
                        usersArr = usersArr.sort((a, b) => a.userName < b.userName ? -1 : 1);
                        props.teamActionHandler.get_Users(usersArr);

                    } else {

                    }
                })
        } catch (error) {
            console.error(error)
        }
        setVisible(false);
    }
    const fetchUsersByUserName = async (username) => {
        try {
            setVisible(true);
            getAuthAndData(`${IDTY_PROD_HOST_URI}${USER_BY_USERNAME}${username}`, history)
                .then(response => {
                    if (response) {
                        let usersArr = [];
                        Array.isArray(response) && response?.forEach(obj => {
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
                        usersArr = usersArr.sort((a, b) => a.userName < b.userName ? -1 : 1);
                        props.teamActionHandler.get_Users(usersArr);
                    } else {

                    }
                })
        } catch (error) {
            console.error(error)
        }
        setVisible(false);
    }
    useEffect(() => {
        fetchRolesData();
        fetchUsersData();
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
    const randomString = () => {
        var result = '';
        for (var i = 2; i > 0; --i) result += smallChars[Math.floor(Math.random() * smallChars.length)];
        for (var i = 2; i > 0; --i) result += bigChars[Math.floor(Math.random() * bigChars.length)];
        for (var i = 2; i > 0; --i) result += numbers[Math.floor(Math.random() * numbers.length)];
        for (var i = 2; i > 0; --i) result += specialChars[Math.floor(Math.random() * specialChars.length)];
        return result;
    }
    const onSaveClick = () => {
        if (!validator.isEmail(email)) {
            handleMessageBox('error', 'Please enter a valid email.');
            return;
        }
        if (!group) {
            handleMessageBox('error', 'Please select a Role');
            return;
        }
        //Check email existane in User table
        getAuthAndData(`${IDTY_PROD_HOST_URI}${USER_BY_MAIL}${email}`, history)
            .then(res => {
                if (res) {
                    handleMessageBox('error', 'Given Email is already exists.');
                    return;
                }
                var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
                AWS.config.update({
                    region: REACT_APP_AWS_REGION,
                    accessKeyId: REACT_APP_IAM_ACCESS_KEY,
                    secretAccessKey: REACT_APP_IAM_SECRET
                })
                var params = {
                    UserPoolId: REACT_APP_POOL_ID,
                    Username: email,
                    DesiredDeliveryMediums: ['EMAIL'],
                    ForceAliasCreation: true || false,
                    TemporaryPassword: email.substring(0, 4) + randomString(),
                    UserAttributes: [
                        {
                            Name: 'email',
                            Value: email,
                        },
                        {
                            Name: 'custom:tenant_key',
                            Value: 'TENANT1234'
                        },
                        {
                            Name: 'email_verified',
                            Value: 'true'
                        }
                    ],
                    ValidationData: [
                        {
                            Name: 'email',
                            Value: email,
                        },
                        {
                            Name: 'custom:tenant_key',
                            Value: 'TENANT1234'
                        }
                    ]
                };
                cognitoidentityserviceprovider.adminCreateUser(params, function (err, data) {
                    if (err) {
                        console.error('*adminCreateUser ', err);
                        handleMessageBox('error', 'Invitation failed');
                    } else {
                        handleMessageBox('success', 'Invitation sent succesfully');
                        let postObj = {};
                        postObj.email = email;
                        postObj.mobile_number = phoneNumber;
                        postObj.user_groups = [];
                        postObj.user_groups.push(group);
                        postObj.status = data.User.UserStatus;
                        postObj.message = message;
                        setVisible(true);
                        var tenantKey = data.User.Attributes.find(attr => attr.Name == 'custom:tenant_key').Value;
                        postAuthAndData(`${IDTY_PROD_HOST_URI}${INVITE_USER}`, postObj, history)
                            .then(data => {
                                if (data) {
                                    setCreateClick(false);
                                    setGroup();
                                    setPhoneNumber();
                                    setEmail();
                                    handleMessageBox('success', 'User Data Saved succesfully');
                                } else {
                                    handleMessageBox('error', 'User Data Saving failed;');
                                }
                                setVisible(false);
                            })
                    }
                    setCreateClick(false);
                });
            })

    }
    const onUpdateClick = () => {
        var postObj = { ...updateUser };
        postObj.groups = [];
        postObj.groups.push(group);
        setVisible(true);
        postAuthAndData(`${IDTY_PROD_HOST_URI}${UPDATE_USER}`, postObj, history)
            .then(data => {
                if (data) {
                    setCreateClick(false);
                    setUpdateUser(false);
                    handleMessageBox('success', 'User Group is Updated succesfully');
                } else {
                    //User Updated failed
                    setCreateClick(false);
                    handleMessageBox('error', 'User Group Update is failed');
                }
                setVisible(false);
            })
    }
    const onSearch = (username) => {
        if (username) {
            fetchUsersByUserName(username);
        } else {
            fetchUsersData();
        }
    }

    return (
        <Fragment>
            {visible ?
                <Loader />
                : <div id="team-container">
                    <MessageBox display={messageBox.display ? 'block' : 'none'} type={messageBox.type} text={messageBox.text} />
                    {!createClick ? (
                        <div style={{ padding: '3%' }}>
                            <div className='team-management-header'>
                                <div className='t-m-title disp-inline-block'>TEAM MANAGEMENT</div>
                                <div className='t-m-create-btn disp-inline-block' onClick={clickHandler}>
                                    <div className='t-m-create-btn-text'>+  Invite User</div>
                                </div>
                                <Table columns={columns}
                                    data={props.users}
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
                            <div style={{ padding: '3%' }}>
                                <div>
                                    <div className='t-m-title'>{updateUser ? 'Update Role' : 'Invite User'}</div>
                                    <div className='t-m-input-block'>
                                        <div className='t-m-input disp-inline-block' style={{ height: '50px' }}>
                                            <div className='t-m-input-label'>E-mail*</div>
                                            <input
                                                type="email"
                                                className='t-m-input-field'
                                                placeholder='richard322@gmail.com'
                                                maxLength={50}
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
                                                {props.roles && props.roles.map(role =>
                                                    <option value={role.group_id}>{role.name}</option>
                                                )}
                                            </select>
                                        </div>
                                        <div className='t-m-message-block'>
                                            <div className='t-m-input-label'>Message</div>
                                            <textarea
                                                className='t-m-message-box'
                                                placeholder="You’ve been invited to join Divinor Luckyme Dashbord. "
                                                maxLength={200}
                                                onChange={e => setMessage(e.target.value)}
                                            />
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
                                        <div
                                            className='role-save-btn disp-inline-block'
                                            role="button"
                                            onClick={onSaveClick}
                                        >
                                            <div className='r-s-btn-text'>Invite</div>
                                        </div>
                                        :
                                        <div
                                            className='role-save-btn disp-inline-block'
                                            role="button"
                                            onClick={onUpdateClick}
                                        >
                                            <div className='r-s-btn-text'>Update</div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </Fragment>
                    )
                    }
                </div>
            }
        </Fragment>
    )
}
