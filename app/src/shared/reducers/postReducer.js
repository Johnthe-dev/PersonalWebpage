export default (state = [], action) => {
    switch(action.type) {
        case "GET_POST_BY_ORIGINATED_POST":
            return action.payload;
        case "GET_POST_BY_POST_CONTENT_AND_TITLE":
            return action.payload;
        case "GET_ALL_POSTS":
            return action.payload;
        default:
            return state;
    }
}