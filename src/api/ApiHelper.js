import { axiosInstance } from './axios-config';

export const getData = async (resource) => {
    try {
        const response = await axiosInstance.get(resource);

        return handleResponse(response);

    } catch (error) {
        return handleError(error);
    }
};

export const postData = async (resource, postData) => {
    try {
        const response = await axiosInstance.post(resource, postData);

        return handleResponse(response);

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