import { createStore } from "redux";
import { applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from "@redux-devtools/extension";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
