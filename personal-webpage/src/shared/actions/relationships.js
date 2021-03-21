import {httpConfig} from "../utils/http-config";

export const getRelationshipByRelationshipsFirstPostAndRelationshipsSecondPost = (firstPost, secondPost) => async (dispatch) => {
    const payload =  await httpConfig.get(`/apis/relationships/?firstPost=${firstPost}&secondPost=${secondPost}`);
    dispatch({type: "GET_RELATIONSHIP_BY_RELATIONSHIPS_FIRST_POST_AND_RELATIONSHIPS_SECOND_POST",payload : payload.data });
};
export const getRelationshipByRelationshipsId = (relationshipsId) => async (dispatch) => {
    const payload =  await httpConfig.get(`/apis/relationships/?relationshipsId=${relationshipsId}`);
    dispatch({type: "GET_RELATIONSHIP_BY_RELATIONSHIPS_ID",payload : payload.data });
};