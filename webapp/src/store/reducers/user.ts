import {BaseReducer} from "./index";
import {createSlice} from "@reduxjs/toolkit";
import {clearError} from "../actions/basicActions";
import {emptyUserJWT, setUserJWT} from "../actions/userActions";

/** -- DEFINITIONS */

/**
 * Define the shape of the reducer, by specifying the type of element accepted in each reducer elements
 *
 * @param {string} userJWT - set the JWT (derived from signature) to be used with lighthouse
 *
 */
export interface UserReducer extends BaseReducer {
  userJWT: string;
}

/** -- INITIAL STATE */

const initialState: UserReducer = {
  dispatchError: undefined,
  userJWT: '',
};

/** --- CREATE THE REDUCER */

export const userReducerSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError,
    emptyUserJWT: emptyUserJWT,
    setUserJWT: setUserJWT,
  },
});

export const userReducerActions = {
  clearError: userReducerSlice.actions.clearError,
  emptyUserJWT: userReducerSlice.actions.emptyUserJWT,
  setUserJWT: userReducerSlice.actions.setUserJWT,
};

export default userReducerSlice.reducer;
