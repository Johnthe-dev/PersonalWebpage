import {httpConfig} from "../utils/http-config";

export const getPostByPostId = (postId) => async (dispatch) => {
    const payload =  await httpConfig.get(`/apis/post/?postId=${postId}`);
    dispatch({type: "GET_POST_BY_POST_ID",payload : payload.data });
};