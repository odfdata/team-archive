import {BaseReducer} from "./index";
import {createSlice} from "@reduxjs/toolkit";
import {clearError} from "../actions/basicActions";
import {setFileList, setFileOrder} from "../actions/fileActions";
import {TeamFile} from "../../hooks/contracts/teamArchive/useGetTeamFiles";

/** -- DEFINITIONS */

/**
 * Define the shape of the reducer, by specifying the type of element accepted in each reducer elements
 *
 * @param {string} fileOrderAsc - set the file order view
 *
 */
export interface FileReducer extends BaseReducer {
  fileOrderAsc: boolean,
  fileList: TeamFile[]
}

/** -- INITIAL STATE */

const initialState: FileReducer = {
  fileOrderAsc: true,
  fileList: []
};

/** --- CREATE THE REDUCER */

export const fileReducerSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    clearError,
    setFileOrder: setFileOrder,
    setFileList: setFileList
  }
});

export const fileReducerActions = {
  clearError: fileReducerSlice.actions.clearError,
  setFileOrder: fileReducerSlice.actions.setFileOrder,
  setFileList: fileReducerSlice.actions.setFileList
};

export default fileReducerSlice.reducer;
