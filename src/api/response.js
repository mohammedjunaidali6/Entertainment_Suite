
export function handleResponse(response) {
    if (response.status == 200) {
        return response;
    }
    return null;
}

export function handleError(error) {
    if (error.data) {
        return error.data;
    }
    return error;
}