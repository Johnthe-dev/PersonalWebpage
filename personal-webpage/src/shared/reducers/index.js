import {combineReducers} from "redux";
import postReducer from "./postReducer";
import relationshipsReducer from "./relationshipsReducer";

export const combinedReducers = combineReducers({
    post: postReducer,
    relationships: relationshipsReducer,
});