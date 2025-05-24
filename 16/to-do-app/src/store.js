import { createStore, combineReducers } from "redux";
import subjectReducer from "./features/subjectSlice";
import listReducer from "./features/listSlice";

const rootReducer = combineReducers({
  subject: subjectReducer,
  list: listReducer,
});

const store = createStore(rootReducer);

export default store;
