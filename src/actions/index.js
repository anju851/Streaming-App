import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM,
  EDIT_STREAM,
} from "./types";
import streams from "../apis/streams";
import history from "../history";
import { formValues } from "redux-form";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

//below is the way of making a POST request thruogh action creator using Axios
//below we are creating an asynchronous action creator,so anytime we make an asynchronous action creator we  make use of redux thunk
//when we return a function from an action creator , the function gets automatically called by redux thunk with two arguments - dispatch and getState function.
//getState is a function that takes up state values from the redux store
export const createStream = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post("/streams", { ...formValues, userId }); // this way we are passing a formvalues along with the user id who created the form

  dispatch({ type: CREATE_STREAM, payload: response.data });
  // do some programmatic navigation to get the user back to the root route
  history.push("/");
};

export const fetchStreams = () => async (dispatch) => {
  const response = await streams.get("/streams");

  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async (dispatch) => {
  const response = await streams.put(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data });
};

export const deleteStream = (id) => async (dispatch) => {
  await streams.delete(`streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });
};
