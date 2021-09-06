import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { reducer as formReducer } from "redux-form"; //named as formReducer to make it more descriptive
import streamReducer from "./streamReducer";
export default combineReducers({
  auth: authReducer,
  form: formReducer,
  streams: streamReducer,
});
