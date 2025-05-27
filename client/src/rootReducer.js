import { combineReducers } from "redux";
import usersReducer from "./slices/usersSlice";

const rootReducer = combineReducers({
    usersData: usersReducer,
});

export default rootReducer;
