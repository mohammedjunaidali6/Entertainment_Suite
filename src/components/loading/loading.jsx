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
  const [text, setText] = useState('');

  const items=[
    'Games can increase the time spent on the Website by 40%, can increase your conversion rates by 10%',
    'Customers are most likely to act when they are deeply immersed in engagement',
    'Try out Purchase specific Rules to help Increasing repeat sales.',
    'Try out Wishlist based Journey - To Know Whats in Customers Mind for next Festive Season.',
  ]

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
      setText(items[Math.floor(Math.random()*items.length)]);
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
      <p style={{textAlign:'center'}}>{text}</p>
    </div>
  )

}