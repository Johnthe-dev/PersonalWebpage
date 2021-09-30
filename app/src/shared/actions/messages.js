import {httpConfig} from "../utils/http-config";

export const getAllMessages = (jwtToken) => async (dispatch) => {
    const payload =  await httpConfig.get(`/apis/message/`, {
        headers: {
            'X-JWT-TOKEN': jwtToken
        }});
    dispatch({type: "GET_ALL_MESSAGES",payload : payload.data });
};