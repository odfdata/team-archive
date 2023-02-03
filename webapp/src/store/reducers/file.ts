import {BaseReducer} from "./index";
import {createSlice} from "@reduxjs/toolkit";
import {clearError} from "../actions/basicActions";
import {
  setChainTransactionInProgress,
  setFileList,
  setFileOrder,
  setFileUploadedCID,
  setFileUploadingInProgress,
  setShowFileUploadingModal
} from "../actions/fileActions";
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
  fileList: TeamFile[],
  showFileUploadingModal: boolean,
  fileUploading_fileUploadInProgress: boolean,
  fileUploading_uploadedFileCID: string,
  fileUploading_chainTransactionPending: boolean
}

/** -- INITIAL STATE */

const initialState: FileReducer = {
  fileOrderAsc: true,
  fileList: [],
  showFileUploadingModal: false,
  fileUploading_fileUploadInProgress: false,
  fileUploading_uploadedFileCID: "",
  fileUploading_chainTransactionPending: false
};

/** --- CREATE THE REDUCER */

export const fileReducerSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    clearError,
    setFileOrder: setFileOrder,
    setFileList: setFileList,
    setShowFileUploadingModal: setShowFileUploadingModal,
    setFileUploadingInProgress: setFileUploadingInProgress,
    setFileUploadedCID: setFileUploadedCID,
    setChainTransactionInProgress: setChainTransactionInProgress,
  }
});

export const fileReducerActions = {
  clearError: fileReducerSlice.actions.clearError,
  setFileOrder: fileReducerSlice.actions.setFileOrder,
  setFileList: fileReducerSlice.actions.setFileList,
  setShowFileUploadingModal: fileReducerSlice.actions.setShowFileUploadingModal,
  setFileUploadingInProgress: fileReducerSlice.actions.setFileUploadingInProgress,
  setFileUploadedCID: fileReducerSlice.actions.setFileUploadedCID,
  setChainTransactionInProgress: fileReducerSlice.actions.setChainTransactionInProgress,
};

export default fileReducerSlice.reducer;
