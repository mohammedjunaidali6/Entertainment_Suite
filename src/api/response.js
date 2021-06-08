import handleMessageBox from '../components/common/MessageBox/MessageBox';

export function handleResponse(response) {
    console.log('****', response)
    if (response.status == 200) {
        return response;
    } else {
        handleMessageBox('error', response.data.data)
        return response;
    }
}

export function handleError(error) {
    return null;
    if (error.data) {
        return error.data;
    }
    return error;
}