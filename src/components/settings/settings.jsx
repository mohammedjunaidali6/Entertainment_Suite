import React, { Fragment, useState } from 'react';
import './settings.css';
import Profile from './profile/profile';
import Team from "./team/team";
import Role from "./notification/notification";
import profile_src from "../../assets/img/profile_setting.svg";
import team_src from "../../assets/img/team_setting.svg";
import role_src from "../../assets/img/role_setting.svg";
import settings_src from '../../assets/img/Property_Settings.svg';
import close_src from '../../assets/img/close.svg';

import PropertySettings from "./propertySettings/propertySettings";
import { Tabs, Tab, Content, MyAccountContent, AppSettingContent } from "../common/utils/tab";
import TeamContatiner from '../../containers/settings/team/teamContainer';


export default function Settings(props) {

    const [active, setActive] = useState(0);
    const [myAccountActive, setMyAccountActive] = useState(0);
    const [appSettingActive, setAppSettingActive] = useState(0);
    const handleClick = e => {
        const index = parseInt(e.target.id, 0);
        if (index !== active) {
            setActive(index);
        }
    };
    const handleMyAccountTabClick = e => {
        const index1 = parseInt(e.target.id, 0);
        if (index1 !== myAccountActive) {
            setMyAccountActive(index1);
        }
    };
    const handleAppSettingTabClick = e => {
        const index2 = parseInt(e.target.id, 0);
        if (index2 !== appSettingActive) {
            setAppSettingActive(index2);
        }
    };
    const settingCloseFn = () => {
        props.history.push('/');
    }

    return (
        <Fragment>
            <div id="settings-container" className="w-100">
                <div className="s-tabs">
                    <div className="s-header pt-1 mb-1">
                        <div className="disp-inline-block s-close float-right c-center" onClick={settingCloseFn}>
                            <img src={close_src} alt="Close" />
                        </div>
                        Settings
                    </div>
                    <Tabs>
                        <Tab onClick={handleClick} active={active === 0} id={0}>
                            My Account
                        </Tab>
                        <Tab onClick={handleClick} active={active === 1} id={1}>
                            Application Settings
                        </Tab>
                    </Tabs>
                    <>
                        <Content active={active === 0}>
                            <Tabs settingsSub={true}>
                                <Tab onClick={handleMyAccountTabClick} myAccountActive={myAccountActive === 0} id={0} fullWidth={true} fontSize={14} opacity={0.5} isSettingSub={true}>
                                    <img src={profile_src} style={{ marginRight: '13px' }} />
                                    Profile
                                </Tab>
                                <Tab onClick={handleMyAccountTabClick} myAccountActive={myAccountActive === 1} id={1} fullWidth={true} fontSize={14} opacity={0.5} isSettingSub={true}>
                                    <img src={team_src} style={{ marginRight: '13px' }} />
                                    Team
                                </Tab>
                                <Tab onClick={handleMyAccountTabClick} myAccountActive={myAccountActive === 2} id={2} fullWidth={true} fontSize={14} opacity={0.5} isSettingSub={true}>
                                    <img src={role_src} style={{ marginRight: '13px' }} />
                                    Roles
                                </Tab>
                            </Tabs>
                            <>
                                <MyAccountContent myAccountActive={myAccountActive === 0}>
                                    <Profile />
                                </MyAccountContent>
                                <MyAccountContent myAccountActive={myAccountActive === 1}>
                                    <TeamContatiner></TeamContatiner>
                                </MyAccountContent>
                                <MyAccountContent myAccountActive={myAccountActive === 2}>
                                    <Role />
                                </MyAccountContent>
                            </>
                        </Content>
                        <Content active={active === 1}>
                            <Tabs settingsSub={true}>
                                <Tab onClick={handleAppSettingTabClick} appSettingActive={appSettingActive === 0} id={0} fullWidth={true} fontSize={14} opacity={0.5} isSettingSub={true}>
                                    <img src={settings_src} style={{ marginRight: '13px' }} />
                                    Property Settings
                                </Tab>
                                {/* <Tab onClick={handleAppSettingTabClick} appSettingActive={appSettingActive === 1} id={1} fullWidth={true} fontSize={14} opacity={0.5} isSettingSub={true}>
                                    Accessibility
                                </Tab> */}
                            </Tabs>
                            <>
                                <AppSettingContent appSettingActive={appSettingActive === 0}>
                                    <PropertySettings />
                                </AppSettingContent>
                                {/* <AppSettingContent appSettingActive={appSettingActive === 1}>
                                    <h1>Accessibility Content</h1>
                                </AppSettingContent> */}
                            </>
                        </Content>
                    </>
                </div>
            </div>
        </Fragment>
    )
}
