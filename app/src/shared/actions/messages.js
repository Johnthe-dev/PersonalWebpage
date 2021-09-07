import {httpConfig} from "../utils/http-config";

export const getAllMessages = () => async (dispatch) => {
    const payload =  await httpConfig.get(`/apis/message/`, {
        headers: {
            'X-JWT-TOKEN': (window.localStorage.getItem('jwt-token')?JSON.parse(window.localStorage.getItem('jwt-token')).value:null)
        }});
    dispatch({type: "GET_ALL_MESSAGES",payload : payload.data });
};