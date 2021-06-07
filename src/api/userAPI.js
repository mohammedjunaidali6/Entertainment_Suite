import { axiosInstance } from '../actions/axios-config';
import { Gateway_Host_URI, Identity_Host_URI, headers, USER_BY_FILTERS } from './apiConstants';
import { handleResponse, handleError } from './response';

export const GetUsersByFilter = async (pageSize) => {
    return axiosInstance
        .get(`${Identity_Host_URI}${USER_BY_FILTERS}?pagesize=${pageSize}`, { headers: headers })
        .then(handleResponse)
        .catch(handleError)
}

