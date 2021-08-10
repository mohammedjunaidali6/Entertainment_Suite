import React, { Fragment, useEffect, useState } from 'react';
import LinearProgressBar from '../common/progressBar/linearProgressBar';
import { postAuthAndData, getData, postData } from '../../api/ApiHelper';
import {
  REPT_PROD_HOST_URI,
  CONSOLIDATION_SUMMARY_BY_FILTER,
  EMAIL,
  DAYS_7,
} from '../../api/apiConstants';


export default function Loading(props) {
  console.log('***', props);
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
    var email = localStorage.getItem(EMAIL);
    var postObj = {
      NumberOfDays: DAYS_7,
    }
    postAuthAndData(`${REPT_PROD_HOST_URI}${CONSOLIDATION_SUMMARY_BY_FILTER}`, postObj, props.history)
      .then(data => {
        console.log('***', data);
        props.dashboardActionHandler.dispatchSummaryTotalsData(data);
      })

  }, []);


  return (
    <div>
      <LinearProgressBar value={perc} />
    </div>
  )

}