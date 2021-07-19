export default (state = [], action) => {
    switch(action.type) {
        case "GET_POST_BY_POST_ID":
            return action.payload;
        default:
            return state;
    }
}