import { Auth } from "aws-amplify";
import { IDTY_PROD_HOST_URI, USER_DATA_GROUP_PERMISSIONS } from "../../api/apiConstants";
import { getAuthAndData } from "../../api/ApiHelper";
import { axiosInstance } from "../../api/axios-config";
import store from "../../store/store";


export const getUserData=(handler)=>{
    var userData = store.getState().LoginReducer.userData;
    if(!userData){
        Auth.currentSession()
        .then(session=>{
            var payLoad=session.idToken.payload;
            getAuthAndData(`${IDTY_PROD_HOST_URI}${USER_DATA_GROUP_PERMISSIONS}${payLoad.email}`)
                .then(res => {
                    if (res&&res.data.code!==-1) {
                        let user=res.data;
                        handler(user); //update redux store
                    
                        axiosInstance.defaults.headers.common['x-tenant-key'] = payLoad['custom:tenant_key'];
                        // axiosInstance.defaults.headers.common['x-uid'] = user.UserID;
                        // axiosInstance.defaults.headers.common['x-uname'] = user.FirstName+' '+user.LastName;
                    } else {
                        handler(null); //update redux store
                    }
                });
        }).catch(error=>{
            handler(null); //update redux store
        })
    } else{
        handler(userData); //update redux store
    }
}