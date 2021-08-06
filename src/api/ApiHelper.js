import { axiosInstance } from './axios-config';
import { Auth } from 'aws-amplify';

export const getAuthAndData = async (resource, history) => {
    try {
        await Auth.currentSession();
        try {
            const response = await axiosInstance.get(resource);
            return handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    } catch (error) {
        history.push('/login');
    }
};
export const postAuthAndData = async (resource, postData, history, headers) => {
    try {
        await Auth.currentSession();
        try {
            if (headers) {
                const response = await axiosInstance.post(resource, postData, { headers: headers });
                return handleResponse(response);
            } else {
                const response = await axiosInstance.post(resource, postData);
                return handleResponse(response);
            }

        } catch (error) {
            return handleError(error);
        }
    } catch (error) {
        history.push('/login');
    }
};


export const getData = async (resource) => {
    try {
        const response = await axiosInstance.get(resource);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

export const postData = async (resource, postData, headers) => {
    try {
        if (headers) {
            const response = await axiosInstance.post(resource, postData, { headers: headers });
            return handleResponse(response);
        } else {
            const response = await axiosInstance.post(resource, postData);
            return handleResponse(response);
        }

    } catch (error) {
        return handleError(error);
    }
};


function handleResponse(response) {
    if (response.status == 200 && response.data?.message == "SUCCESS") {
        return response.data.data;
    } else {
        console.error(`*** `, response.data?.data)
        return null;
    }
}

function handleError(error) {
    console.error(`*** `, error.message)
    return null;
    if (error.data) {
        return error.data;
    }
    return error;
}