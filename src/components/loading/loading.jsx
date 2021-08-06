import React, { Fragment, useEffect, useState } from 'react';
import LinearProgressBar from '../common/progressBar/linearProgressBar';
import { getAuthAndData, getData, postData } from '../../api/ApiHelper';
import { EMAIL, IDTY_PROD_HOST_URI, USER_ROLES_PERMISSIONS } from '../../api/apiConstants';
import { Auth } from 'aws-amplify';


export default function Loading(props) {
  const [perc, setPerc] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setPerc((oldProgress) => oldProgress + 10);
    }, 300);

    setTimeout(() => {
      clearInterval(timer);
      props.history.push('/engagements/smart');
    }, 3000);
  }, []);

  useEffect(() => {
    var email = localStorage.getItem(EMAIL);


  }, []);


  return (
    <div>
      <LinearProgressBar value={perc} />
    </div>
  )

}