export default (state = [], action) => {
    switch(action.type) {
        case "GET_RELATIONSHIP_BY_RELATIONSHIPS_FIRST_POST_AND_RELATIONSHIPS_SECOND_POST":
            return action.payload;
        case "GET_RELATIONSHIP_BY_RELATIONSHIPS_ID":
            return action.payload;
        default:
            return state;
    }
}