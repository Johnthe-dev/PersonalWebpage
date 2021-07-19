import {httpConfig} from "../utils/http-config";

export const getPostByOriginatedPost = (postOrigin) => async (dispatch) => {
    const payload =  await httpConfig.get(`/apis/post/?postOrigin=${postOrigin}`);
    dispatch({type: "GET_POST_BY_ORIGINATED_POST",payload : payload.data });
};
export const getPostByPostContentAndTitle = (postSearchTerms) => async (dispatch) => {
    const payload =  await httpConfig.get(`/apis/post/?postSearchTerms=${postSearchTerms}`);
    dispatch({type: "GET_POST_BY_POST_CONTENT_AND_TITLE",payload : payload.data });
};
export const getAllPosts = () => async (dispatch) => {
    const payload =  await httpConfig.get(`/apis/post/`);
    dispatch({type: "GET_ALL_POSTS",payload : payload.data });
};