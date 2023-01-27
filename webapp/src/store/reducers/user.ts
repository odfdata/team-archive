import {BaseReducer} from "./index";
import {createSlice} from "@reduxjs/toolkit";
import {clearError} from "../actions/basicActions";
import {emptyUserSignature, setUserSignature} from "../actions/userActions";

/** -- DEFINITIONS */

/**
 * Define the shape of the reducer, by specifying the type of element accepted in each reducer elements
 *
 * @param {string} userSignature - set the signature to be used with lighthouse
 *
 */
export interface UserReducer extends BaseReducer {
  userSignature: string;
}

/** -- INITIAL STATE */

const initialState: UserReducer = {
  dispatchError: undefined,
  userSignature: '',
};

/** --- CREATE THE REDUCER */

export const userReducerSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError,
    emptyUserSignature,
    setUserSignature,
  },
});

export const userReducerActions = {
  clearError: userReducerSlice.actions.clearError,
  emptyUserSignature: userReducerSlice.actions.emptyUserSignature,
  setUserSignature: userReducerSlice.actions.setUserSignature,
};

export default userReducerActions.reducer;
