import { axiosInstance } from '../actions/axios-config';
import { localHost807Uri, headers } from './apiConstants';

export const GetUsersByFilter = () => {
    return axiosInstance.get(`${localHost807Uri}/idty/userbyfilter?pagesize=100`, { headers: headers })
        .then(response => {
            if (response.status == 200 && response.data.data) {
                return response.data
            }
        })
        .catch(error => {
            console.error('***', error);
        });
    return null;
}
