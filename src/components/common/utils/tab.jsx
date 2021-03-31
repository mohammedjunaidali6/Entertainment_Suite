import styled from "styled-components";

export const Tabs = styled.div`
  overflow: hidden;
  font-family: Open Sans;
  height: ${props => !props.settingsSub ? "2.1em" : ""};
  padding-top: ${props => props.settingsSub ? "22px" : ""};
  padding-left: 24px;
  width: ${props => (props.settingsSub ? "15%" : "")};
  float: ${props => (props.settingsSub ? "left" : "")};
  ${props => (props.settingsSub ? "clearfix" : "")};
`;

export const Tab = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  position: relative;
  margin-right: 25px;
  font-size: ${props => (props.fontSize ? `${props.fontSize}px` : "12px")};
  font-weight: bold;
  letter-spacing: 0;
  line-height: 15px;
  font-family: "Nunito Sans";
  padding: ${props => props.isSettingSub ? "20px 10px" : "0 10px"};
  border: ${props => (props.active ? "1px solid #ccc" : "")};
  opacity: ${props => (props.opacity && !props.myAccountActive ? props.opacity : "")};
  border-bottom: ${props => (props.active ? "none" : "")};
  background-color: ${props => (props.active ? "var(--buttonBg)" : (props.isSettingSub ? "var(--bodyBg)" : "#dbdcdc"))};
  color: ${props => (props.active ? "var(--buttonTextActive)" : (props.myAccountActive || props.appSettingActive ? "#3F4045" : "var(--buttonTextInactive)"))};
  height: ${props => (props.active ? "24px" : "24px; top:.2em")};
  height: ${props => (props.active ? "24px" : "24px; top:.2em")};
  display: ${props => (props.fullWidth ? "block" : "")};
  border-radius: 5px;
  transition: background-color 0.5s ease-in-out;
  vertical-align: middle;

  :hover {
    
  }
`;
export const Content = styled.div`
  ${props => (props.active ? "" : "display:none")}
`;

export const MyAccountContent = styled.div`
  ${props => (props.myAccountActive ? "" : "display:none")};
  width: 85%;
  float: left;
  padding-top: 2px;
`;

export const AppSettingContent = styled.div`
  ${props => (props.appSettingActive ? "" : "display:none")};
  width: 85%;
  float: left;
  padding-top: 2px;
`;