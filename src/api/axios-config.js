import axios from 'axios';
import React from 'react';
import { Gateway_Host_URI, Identity_Host_URI, Engagement_Host_URI, Prod_Base_URI, headers } from './apiConstants';

export const isHandlerEnabled = (config = {}) => {
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


const { useState, useCallback, useMemo, useEffect } = React;

console.log('env', process.env);
export const axiosInstance = axios.create({
    baseURL: Prod_Base_URI,
    headers: {
        'client_id': headers.client_id,
        'secret': headers.secret
    }
}); // export this and use it in all your components

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
        }, error => {
            dec();
            return Promise.reject(error);
        });
        // add response interceptors
        // const resInterceptor =  axiosInstance.interceptors.response.use(interceptors.response, interceptors.error);
        const resInterceptor = axiosInstance.interceptors.response.use((response) => {
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