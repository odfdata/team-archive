import {CaseReducer, PayloadAction} from "@reduxjs/toolkit";
import {UserReducer} from "../reducers/user";

/** -- ACTIONS */

/**
 * Remove the userSignature from the UserReducer
 * @param {Draft<UserReducer>} state
 * @param {PayloadAction<void>} action
 */
export const emptyUserSignature: CaseReducer<UserReducer, PayloadAction<void>> =
  (state, action) => {
    state.userSignature = '';
  }

/**
 * Add the userSignature
 * @param {Draft<UserReducer>} state
 * @param {PayloadAction<string>} action
 */
export const setUserSignature: CaseReducer<UserReducer, PayloadAction<string>> =
  (state, action) => {
    state.userSignature = action.payload;
  }
