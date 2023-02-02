import {CaseReducer, PayloadAction} from "@reduxjs/toolkit";
import {UserReducer} from "../reducers/user";

/** -- ACTIONS */

/**
 * Remove the userJWT from the UserReducer
 * @param {Draft<UserReducer>} state
 * @param {PayloadAction<void>} action
 */
export const emptyUserJWT: CaseReducer<UserReducer, PayloadAction<void>> =
  (state, action) => {
    state.userJWT = '';
  }

/**
 * Add the userJWT
 * @param {Draft<UserReducer>} state
 * @param {PayloadAction<string>} action
 */
export const setUserJWT: CaseReducer<UserReducer, PayloadAction<string>> =
  (state, action) => {
    state.userJWT = action.payload;
  }
