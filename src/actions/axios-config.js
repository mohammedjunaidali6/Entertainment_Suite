import axios from 'axios';
import React from 'react';

export const isHandlerEnabled = (config={}) => {
    return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ? false : true
}

export const requestHandler = (request) => {
    if (isHandlerEnabled(request)) {
        request.headers['test_header'] = 'Martin';
    }
    return request;
}

export const errorHandler = (error) => {
    if (isHandlerEnabled(error.config)) {
      
    }
    return Promise.reject({ ...error })
}
  
export const successHandler = (response) => {
    if (isHandlerEnabled(response.config)) {
        
    }
    return response
}


const { useState, useCallback,useMemo, useEffect } = React;

export const axiosInstance = axios.create(); // export this and use it in all your components

export const useAxiosLoader = () => {
  const [counter, setCounter] = useState(0);
  const inc = useCallback(() => setCounter(counter => counter + 1), [setCounter]); // add to counter
  const dec = useCallback(() => setCounter(counter => counter - 1), [setCounter]); // remove from counter
  
//   const interceptors = useMemo(() => ({
//     request: config => (inc(), config),
//     response: response => (dec(), response),
//     error: error => (dec(), Promise.reject(error)),
//   }), [inc, dec]); // create the interceptors
  
  useEffect(() => {
    // add request interceptors
    // const reqInterceptor = axiosInstance.interceptors.request.use(interceptors.request, interceptors.error);
    const reqInterceptor = axiosInstance.interceptors.request.use(request => {
        inc();
        return requestHandler(request);
    },error=>{
        dec();
        return Promise.reject(error);
    });
    // add response interceptors
    // const resInterceptor =  axiosInstance.interceptors.response.use(interceptors.response, interceptors.error);
    const resInterceptor =  axiosInstance.interceptors.response.use((response) => {
        dec();
        return successHandler(response);
    }, (error) => {
        dec();
        return errorHandler(error);
    });
    return () => {
      // remove all intercepts when done
      axiosInstance.interceptors.request.eject(reqInterceptor);
      axiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, []);
  
  return [counter > 0];
};