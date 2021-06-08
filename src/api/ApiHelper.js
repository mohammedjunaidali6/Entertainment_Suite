import axios from 'axios';
import { axiosInstance } from '../actions/axios-config';
import { Gateway_Host_URI, Identity_Host_URI, headers, USER_BY_FILTERS } from './apiConstants';
import { handleResponse, handleError } from './response';

export const GetUsersByFilter = async (uri, pageSize) => {
    return axiosInstance
        .get(`${Identity_Host_URI}${USER_BY_FILTERS}?pagesize=${pageSize}`, { headers: headers })
        .then(handleResponse)
        .catch(handleError)
}


export const getSingle = (resource, id) => {
    return axiosInstance
        .get(`${Identity_Host_URI}${resource}`)
        .then(handleResponse)
        .catch(handleError)
};

export const getData = async (resource) => {
    console.log('****', `${Identity_Host_URI}${resource}`)

    try {
        const response = await axiosInstance
            .get(`${Identity_Host_URI}${resource}`, { headers: headers });

        return handleResponse(response);

    } catch (error) {
        console.log('***', error.message)
        return handleError(error);
    }
};

export const postData = async (resource) => {
    console.log('****', `${Identity_Host_URI}${resource}`)

    try {
        const response = await axiosInstance
            .post(`${Identity_Host_URI}${resource}`, { headers: headers });

        return handleResponse(response);

    } catch (error) {
        console.log('***', error.message)
        return handleError(error);
    }
};