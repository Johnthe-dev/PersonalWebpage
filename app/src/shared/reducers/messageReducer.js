export default (state = [], action) => {
    switch(action.type) {
        case "GET_ALL_MESSAGES":
            return action.payload;
        default:
            return state;
    }
}