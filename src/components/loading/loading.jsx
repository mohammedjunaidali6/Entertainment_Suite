import React, { Fragment, useEffect, useState } from 'react';
import LinearProgressBar from '../common/progressBar/linearProgressBar';
import { getData, postData } from '../../api/ApiHelper';
import { Identity_Host_URI, USER_ROLES_PERMISSIONS } from '../../api/apiConstants';


export default function Loading(props) {
  console.log('***', props)
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
    var email = localStorage.getItem('email');
    console.log('***', email);
    getData(`${Identity_Host_URI}${USER_ROLES_PERMISSIONS}${email}`)
      .then(data => {
        console.log('***', data);
      });
  });


  return (
    <div>
      <LinearProgressBar value={perc} />
    </div>
  )

}