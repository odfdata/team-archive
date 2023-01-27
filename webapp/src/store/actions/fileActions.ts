import {CaseReducer, PayloadAction} from "@reduxjs/toolkit";
import {FileReducer} from "../reducers/file";


/** -- ACTIONS */


/**
 * Sets the file order in the view
 * @param {Draft<FileReducer>} state
 * @param {PayloadAction<boolean>} action
 */
export const setFileOrder: CaseReducer<FileReducer, PayloadAction<boolean>> =
  (state, action) => {
    state.fileOrderAsc = action.payload;
}
