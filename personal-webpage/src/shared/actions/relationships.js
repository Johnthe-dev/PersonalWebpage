import {httpConfig} from "../utils/http-config";

export const getRelationshipByRelationshipsFirstPostAndRelationshipsSecondPost = (firstPost, secondPost) => async (dispatch) => {
    const payload =  await httpConfig.get(`/apis/relationships/?firstPost=${firstPost}&secondPost=${secondPost}`);
    dispatch({type: "GET_RELATIONSHIP_BY_RELATIONSHIPS_FIRST_POST_AND_RELATIONSHIPS_SECOND_POST",payload : payload.data });
};
export const getRelationshipByPostId = (postId) => async (dispatch) => {
    const payload =  await httpConfig.get(`/apis/relationships/?postId=${postId}`);
    dispatch({type: "GET_RELATIONSHIP_BY_POST_ID",payload : payload.data });
};