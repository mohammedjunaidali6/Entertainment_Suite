import { axiosInstance } from './axios-config';
import { Auth } from 'aws-amplify';
import { DUMM_TENANT_KEY } from './apiConstants';


const getCurrentSession=async () => {
    var session = await Auth.currentSession();
    
    var email=session?.idToken?.payload?.email;
    var tenantKey=session?.idToken?.payload['custom:tenant_key'];

    axiosInstance.defaults.headers.common['x-tenant-key'] = tenantKey || DUMM_TENANT_KEY;
    axiosInstance.defaults.headers.common['x-umail'] = email;
}


export const getAuthAndData = async (resource, history) => {
    try {
        await getCurrentSession();
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
export const postAuthAndData = async (resource, postData, history) => {
    try {
        await getCurrentSession();
        try {
            const response = await axiosInstance.post(resource, postData);
            return handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    } catch (error) {
        history.push('/login');
    }
};

//Current session giving null as user is not yet logged in.//Calling from Reset Password
//////We are not updating FirstName and LastName from Reset password at this time. So this is commented.
// export const postLoginAPIData = async (resource, postData, history,tenantKey) => {
//     try {
//         axiosInstance.defaults.headers.common['x-tenant-key'] = tenantKey || DUMM_TENANT_KEY;
//         axiosInstance.defaults.headers.common['x-uemail'] = postData.Email;
//             try {
//                 const response = await axiosInstance.post(resource, postData);
//                 return handleResponse(response);
//             } catch (error) {
//                 return handleError(error);
//             }
//     } catch (error) {
//         history.push('/login');
//     }
// };


function handleResponse(response) {
    let responseCode=response.data.code;
    if (responseCode == 1||responseCode == 2||responseCode == 3||responseCode == 4) {
        return response.data;
    } else{
        var resp={
                data : {
                    code:-1,
                    data:null,
                }
        }
        return resp.data;
    }
}

function handleError(error) {
    console.error(`*** `, error.message)
    return null;
}