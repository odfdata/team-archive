import {BaseReducer} from "./index";
import {createSlice} from "@reduxjs/toolkit";
import {clearError} from "../actions/basicActions";
import {setFileOrder} from "../actions/fileActions";

/** -- DEFINITIONS */

/**
 * Define the shape of the reducer, by specifying the type of element accepted in each reducer elements
 *
 * @param {string} fileOrderAsc - set the file order view
 *
 */
export interface FileReducer extends BaseReducer {
  fileOrderAsc: boolean
}

/** -- INITIAL STATE */

const initialState: FileReducer = {
  fileOrderAsc: true
};

/** --- CREATE THE REDUCER */

export const fileReducerSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    clearError,
    setFileOrder: setFileOrder
  }
});

export const fileReducerActions = {
  clearError: fileReducerSlice.actions.clearError,
  setFileOrder: fileReducerSlice.actions.setFileOrder
};

export default fileReducerSlice.reducer;
