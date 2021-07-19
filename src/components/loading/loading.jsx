import React, { Fragment, useEffect, useState } from 'react';
import LinearProgressBar from '../common/progressBar/linearProgressBar';

export default function Loading(props) {
  console.log('***', props)
  const [perc, setPerc] = useState(1);


  setTimeout(() => {
    //props.history.push('/rewardzone');

  }, 3000);
  useEffect(() => {
    const timer = setInterval(() => {
      setPerc(perc + 33)
    }, 1000);

  }, [])


  return (
    <div style={{ marginTop: '50%', alignContent: 'center' }}>
      <LinearProgressBar />
    </div>
  )

}