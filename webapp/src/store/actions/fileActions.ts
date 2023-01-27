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

/**
 * Show/hide the modal responsible for uploading a new file
 * @param {FileReducer} state
 * @param {PayloadAction<boolean>} action
 */
export const setShowFileUploadingModal: CaseReducer<FileReducer, PayloadAction<boolean>> =
  (state, action) => {
    state.showFileUploadingModal = action.payload;
}

/**
 * True/False the status of a file uploading
 * @param {FileReducer} state
 * @param {PayloadAction<boolean>} action
 */
export const setFileUploadingInProgress: CaseReducer<FileReducer, PayloadAction<boolean>> =
  (state, action) => {
    state.fileUploading_fileUploadInProgress = action.payload;
}

/**
 * Sets the CID of the CID Metadata of the uploaded file
 * @param {FileReducer} state
 * @param {PayloadAction<string>} action
 */
export const setFileUploadedCID: CaseReducer<FileReducer, PayloadAction<string>> =
  (state, action) => {
    state.fileUploading_uploadedFileCID = action.payload;
}

/**
 * True/False if the transaction to publish the CID on the chain is in progress
 * @param {FileReducer} state
 * @param {PayloadAction<boolean>} action
 */
export const setChainTransactionInProgress: CaseReducer<FileReducer, PayloadAction<boolean>> =
  (state, action) => {
    state.fileUploading_chainTransactionPending = action.payload;
}
