import {combineReducers} from "redux";
import postReducer from "./postReducer";
import relationshipsReducer from "./relationshipsReducer";
import dataReducer from "./dataReducer";
import messageReducer from "./messageReducer";

export const combinedReducers = combineReducers({
    data: dataReducer,
    post: postReducer,
    relationships: relationshipsReducer,
    messages: messageReducer,
});