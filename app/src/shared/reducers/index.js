import {combineReducers} from "redux";
import postReducer from "./postReducer";
import relationshipsReducer from "./relationshipsReducer";
import dataReducer from "./dataReducer";

export const combinedReducers = combineReducers({
    data: dataReducer,
    post: postReducer,
    relationships: relationshipsReducer,
});