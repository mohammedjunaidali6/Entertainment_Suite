import React, { Fragment, useEffect, useState } from 'react';
import Spinner from 'react-spinner-material';
import LinearProgressBar from '../common/progressBar/linearProgressBar';
import { postAuthAndData, getData, postData } from '../../api/ApiHelper';
import {
  REPT_PROD_HOST_URI,
  CONSOLIDATION_SUMMARY_BY_FILTER,
  EMAIL,
  DEFAULT_FILTER_DAYS,
  SOMETHING_WENT_WRONG,
} from '../../api/apiConstants';
import createNotification from '../common/reactNotification';
import NotificationContainer from 'react-notifications/lib/NotificationContainer';
import Loader from '../common/Spinner/spinner';


export default function Loading(props) {
  const [perc, setPerc] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setPerc((oldProgress) => oldProgress + 10);
    }, 300);

    setTimeout(() => {
      clearInterval(timer);
      props.history.push('/');
    }, 3000);
  }, []);

  useEffect(() => {
    var postObj = {
      NumberOfDays: DEFAULT_FILTER_DAYS,
    }
    postAuthAndData(`${REPT_PROD_HOST_URI}${CONSOLIDATION_SUMMARY_BY_FILTER}`, postObj, props.history)
      .then(res => {
        if (handleResponseCode(res)) {
          props.dashboardActionHandler.dispatchSummaryTotalsData(res.data);
        }
      })

  }, []);
  const handleResponseCode=(resp)=>{
    if(!resp || resp.code===-1){
        createNotification('error',SOMETHING_WENT_WRONG +' in Loading');
        return false;
    }else{
        return true;
    }
}


  return (
    <div>
      <NotificationContainer/>
      <div style={{marginLeft: '6%',marginBottom: '1%'}}>
        <Spinner radius={25} color={"#007BFF"} stroke={2} visible={true} />
      </div>
      <div style={{textAlign:'center'}}>Did you know?</div>
      <p style={{textAlign:'center'}}>e-commerce management app</p>
    </div>
  )

}