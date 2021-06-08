import axios from 'axios';
import { axiosInstance } from '../actions/axios-config';
import { Gateway_Host_URI, Identity_Host_URI, Engagement_Host_URI, headers } from './apiConstants';
import { handleResponse, handleError } from './response';


export const getSingle = async (resource, id) => {
    try {
        const response = await axiosInstance
            .get(`${Identity_Host_URI}${resource}`);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

export const getData = async (resource) => {
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
    try {
        const response = await axiosInstance
            .post(`${Identity_Host_URI}${resource}`, { headers: headers });

        return handleResponse(response);

    } catch (error) {
        console.log('***', error.message)
        return handleError(error);
    }
};