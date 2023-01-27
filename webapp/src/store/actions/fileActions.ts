import {CaseReducer, PayloadAction} from "@reduxjs/toolkit";
import {FileReducer} from "../reducers/file";
import {TeamFile} from "../../hooks/contracts/teamArchive/useGetTeamFiles";


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

/**
 * Sets the file list retrieved from SC
 * @param {FileReducer} state
 * @param {PayloadAction<TeamFile[]>} action
 */
export const setFileList: CaseReducer<FileReducer, PayloadAction<TeamFile[]>> =
  (state, action) => {
    state.fileList = action.payload;
}
