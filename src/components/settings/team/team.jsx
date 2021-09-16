import React, { useState, useEffect, Fragment } from 'react';
import SearchBar from '../../common/searchBar/searchBar';
import Table from '../../common/reactTable/table';
import './team.css';
import user from '../../../assets/img/user.svg';
import ActionMenu from '../../common/reactTable/menu';
import { getAuthAndData, postAuthAndData } from '../../../api/ApiHelper';
import validator from 'validator';
import AWS from 'aws-sdk';
import { useHistory } from 'react-router-dom';
import {
    IDTY_PROD_HOST_URI,
    INVITE_USER,
    UPDATE_USER,
    DELETE_USER,
    USER_BY_FILTERS,
    USER_BY_MAIL,
    USER_BY_USERNAME,
    GROUP_ALL,
    SOMETHING_WENT_WRONG,
    serverResponse
} from '../../../api/apiConstants';
import createNotification from '../../common/reactNotification';
import NotificationContainer from 'react-notifications/lib/NotificationContainer';
import { getUserData } from '../../common/storeFunctions';


export default function Team(props) {
    var history = useHistory();
    const {
        REACT_APP_AWS_REGION,
        REACT_APP_IAM_ACCESS_KEY,
        REACT_APP_IAM_SECRET,
        REACT_APP_POOL_ID
    } = process.env;
    const [createClick, setCreateClick] = useState(false);
    const [updateUser, setUpdateUser] = useState();
    const [userData, setUserData] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [group, setGroup] = useState();
    const [message, setMessage] = useState('');
    var smallChars = 'abcdefghijklmnopqrstuvwxyz';
    var numbers = '0123456789';
    var bigChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var specialChars = '@#$&!';

      
    const columns = [
        {
            name: "User Name",
            width: '30%',
            cell: row => <div>
                <img style={{
                    height: '36px',
                    marginRight: '10px',
                    borderRadius: '10px',
                    display: 'inline-block'
                }} src={user} />
                <div className='disp-inline-block'>{row.user_name}</div>
            </div>
        },
        {
            name: "Email",
            selector: "email",
            width: '25%',
        },
        {
            name: "Role",
            selector: "group",
            width: '20%',
        },
        {
            name: "Status",
            cell: row => row.is_enabled ? 'Active' : 'Inactive',
            width: '10%',
        },
        {
            name: "Actions",
            width: '15%',
            cell: row => <ActionMenu onAction={(e) => onActionClick(e, row)} />
        }
    ]

    const handleLoader = (showBool) => {
        props.routeActionHandler.dispatchLoaderData(showBool);
    }
    const handleAlertDialog = (obj) => {
        props.routeActionHandler.dispatchAlertDialogData(obj);
    }
    const handleResponseCode=(resp)=>{
        if(!resp || resp.code===-1){
            createNotification('error',SOMETHING_WENT_WRONG+' Teams');
            return false;
        } else {
            return true;
        }
    }
    const cognitoIdentityServiceProvider=()=>{
        var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
        // AWS.config.region=REACT_APP_AWS_REGION;
        AWS.config.update({
            region: REACT_APP_AWS_REGION,
            accessKeyId: REACT_APP_IAM_ACCESS_KEY,
            secretAccessKey: REACT_APP_IAM_SECRET
        })
        return cognitoidentityserviceprovider;
    }
    const randomString = () => {
        var result = '';
        for (var i = 2; i > 0; --i) result += smallChars[Math.floor(Math.random() * smallChars.length)];
        for (var i = 2; i > 0; --i) result += bigChars[Math.floor(Math.random() * bigChars.length)];
        for (var i = 2; i > 0; --i) result += numbers[Math.floor(Math.random() * numbers.length)];
        for (var i = 2; i > 0; --i) result += specialChars[Math.floor(Math.random() * specialChars.length)];
        return result;
    }


    function clickHandler() {
        setCreateClick(true);
        setUpdateUser();
        setEmail();
        setPhoneNumber();
    }

    const fetchRolesData = () => {
        handleLoader(true);
        getAuthAndData(`${IDTY_PROD_HOST_URI}${GROUP_ALL}`, history)
            .then(res => {
                if (handleResponseCode(res)) {
                    let rolesArr = res.data.sort((a, b) => a.name < b.name ? -1 : 1);
                    props.teamActionHandler.dispatchUserRoles(rolesArr);
                }
            handleLoader(false);
        })
    }
    const fetchUsersData = () => {
        handleLoader(true);
        getAuthAndData(`${IDTY_PROD_HOST_URI}${USER_BY_FILTERS}${100}`, history)
            .then(res => {
                if (handleResponseCode(res)) {
                    let usersArr = res.data.sort((a, b) => a.user_name < b.user_name ? -1 : 1);
                    props.teamActionHandler.dispatchUsersData(usersArr);
                }
            handleLoader(false);
        })
    }
    const fetchUsersByUserName = async (username) => {
        handleLoader(true);
        getAuthAndData(`${IDTY_PROD_HOST_URI}${USER_BY_USERNAME}${username}`, history)
            .then(res => {
                if (handleResponseCode(res)) {
                    let usersArr = res.data.sort((a, b) => a.user_name < b.user_name ? -1 : 1);
                    console.log('***',usersArr)
                    props.teamActionHandler.dispatchUsersData(usersArr);
                }
            handleLoader(false);
        })
    }

    const onActionClick = (e, rowData) => {
        if (e.target.outerText === 'Edit') {
            setCreateClick(true);
            setEmail(rowData.email);
            setPhoneNumber(rowData.mobileNumber);
            setUpdateUser(rowData);
        } else if (e.target.outerText === 'Delete') {
            handleAlertDialog({
                open: true, title: 'Delete User', text: 'Are you sure, Do you want to delete User?', handleClose: (bool) => {
                    handleAlertDialog({ open: false, title: '', text: '', handleClose: () => { } });
                    if (bool) {
                        deleteUser(rowData);
                    }
                }
            });
        }
    }

    const onEmailChange = e => {
        let mail = e.target.value;
        setEmail(mail)
    }
    const onGroupSelect = e => {
        let group = e.target.value;
        setGroup(group);
    }

    const inviteAndSaveUser=()=>{
        var cognitoISP=cognitoIdentityServiceProvider();
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
                    Value: userData.TenantKey
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
                    Value: userData.TenantKey
                }
            ]
        };
        cognitoISP.adminCreateUser(params, function (err, data) {
            if (err) {
                //UsernameExistsException
                createNotification('error', 'Invitation failed');
            } else {
                createNotification('success', 'Invitation sent succesfully');
                let postObj = {};
                postObj.email = email;
                postObj.user_groups = [];
                postObj.user_groups.push(group);
                postObj.status = data.User.UserStatus;
                handleLoader(true);
                postAuthAndData(`${IDTY_PROD_HOST_URI}${INVITE_USER}`, postObj, history)
                    .then(res => {
                        if (handleResponseCode(res)) {
                            setCreateClick(false);
                            setGroup();
                            setEmail();
                            createNotification('success', 'User Data Saved succesfully');
                        } else {
                            createNotification('error', 'User Data Saving failed;');
                        }
                        handleLoader(false);
                    })
                    setCreateClick(false);
            }
        });
    }
    const saveUser = () => {
        if (!validator.isEmail(email)) {
            createNotification('error', 'Please enter a valid email.');
            return;
        }
        if (!group) {
            createNotification('error', 'Please select a Role');
            return;
        }
        //Check email existane in User table
        getAuthAndData(`${IDTY_PROD_HOST_URI}${USER_BY_MAIL}${email}`, history)
            .then(res => {
                var responseCode=res.code;
                if (handleResponseCode(res)) {
                    if(responseCode===serverResponse.USER_ALREADY_EXISTS){
                        createNotification('warning', `User with ${email} already exists.`);
                    }else{
                        inviteAndSaveUser();
                    }
                } else {
                    createNotification('error', 'Error in Creating User.');
                }
            })
    }
    const deleteUser=(rowData)=>{
        handleLoader(true);
        var cognitoISP=cognitoIdentityServiceProvider();
        var params = {
            UserPoolId: REACT_APP_POOL_ID,
            Username:rowData.email
        }
        cognitoISP.adminDeleteUser(params,(err,data)=>{
            if(data){
                getAuthAndData(`${IDTY_PROD_HOST_URI}${DELETE_USER}${rowData.user_id}`, history)
                    .then(res => {
                        if (handleResponseCode(res)) {
                            createNotification('success', 'User deleted succesfully');
                            fetchUsersData();
                        } else {
                            createNotification('error', 'Deleting user is failed');
                        }
                        handleLoader(false);
                    })
            } else {
                createNotification('error',err);
                handleLoader(false);
            }
        })
    }
    const updateUserRole = () => {
        var postObj = { ...updateUser };
        postObj.groups = [];
        postObj.groups.push(group);
        handleLoader(true);
        postAuthAndData(`${IDTY_PROD_HOST_URI}${UPDATE_USER}`, postObj, history)
            .then(res => {
                handleLoader(false);
                if (handleResponseCode(res)) {
                    fetchUsersData(); // fetch users again
                    setCreateClick(false);
                    setUpdateUser();
                    createNotification('success', 'User Group is Updated succesfully');
                } else {
                    //User Updated failed
                    setCreateClick(false);
                    createNotification('error', 'User Group Update is failed');
                }
            })
    }
    const onSearch = (username) => {
        if (username) {
            fetchUsersByUserName(username);
        } else {
            fetchUsersData();
        }
    }

    useEffect(() => {
        fetchRolesData();
        fetchUsersData();

        getUserData(data=>{
            console.log('***',data);
            setUserData(data);
            props.loginActionHandler.dispatchUserData(data);
        });
    }, [])


    return (
        <div id="team-container">
            <NotificationContainer/>
            {!createClick ? 
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
            :
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
                                {/* <div className='t-m-input disp-inline-block'>
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
                                </div> */}
                                <div className='t-m-input disp-inline-block'>
                                    <div className='t-m-input-label'>Role</div>
                                    <select className='t-m-input-field' placeholder="Select" onChange={onGroupSelect}>
                                        <option value={updateUser ? props.roles.find(r=>r.name===updateUser.group)?.group_id:''}>
                                            {updateUser ? updateUser.group:'Select Role'}
                                        </option>
                                        {props.roles && props.roles.map(obj =>
                                            <option value={obj.group_id}>{obj.name}</option>
                                        )}
                                    </select>
                                </div>
                                {/* <div className='t-m-message-block'>
                                    <div className='t-m-input-label'>Message</div>
                                    <textarea
                                        className='t-m-message-box'
                                        placeholder="You’ve been invited to join Divinor Luckyme Dashbord. "
                                        maxLength={200}
                                        onChange={e => setMessage(e.target.value)}
                                    />
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className='role-actions  clearfix'>
                        <div className='role-act-btn'>
                            <div className='role-cancel-btn disp-inline-block' role="button" onClick={() => { setCreateClick(false) }}>
                                <div className='r-c-btn-text'>Cancel</div>
                            </div>
                            {!updateUser ?
                                <div className='role-save-btn disp-inline-block' role="button" onClick={saveUser}>
                                    <div className='r-s-btn-text'>Invite</div>
                                </div>
                                :
                                <div className='role-save-btn disp-inline-block' role="button" onClick={updateUserRole}>
                                    <div className='r-s-btn-text'>Update</div>
                                </div>
                            }
                        </div>
                    </div>
                </Fragment>
            }
        </div>
    )
}
