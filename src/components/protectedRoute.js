import React, { useEffect } from 'react'
import { Auth } from 'aws-amplify'

const ProtectedRoute = (Comp, route = '/login') => (props) => {
  console.log('***', props)
  Auth.currentUserInfo()
    .then(user => {
      //return <Comp {...props} />
    })
    .catch(err => {
      props.history.push(route)
    });
}

export default ProtectedRoute;