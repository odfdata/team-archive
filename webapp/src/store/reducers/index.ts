import {combineReducers} from "redux";
import {ErrorsEnum} from "../../utils/ProjectTypes/Errors.enum";
import {FileReducer, fileReducerSlice} from "./file";

interface RootReducer {
  cid: FileReducer,
}

const rootReducer = combineReducers<RootReducer>({
  cid: fileReducerSlice.reducer,
});

export default rootReducer;




/** -- DEFINE THE BASE REDUCER -- */

/**
 * Basic reducer interface, with members common to all reducers
 */
export interface BaseReducer {
  dispatchError?: DispatchError | undefined
}

/**
 * Single error element, in response to a specific dispatch action
 *
 * @property {string} code - custom internal code
 * @property {string} message - customer error message
 * @property {string} action - the action that caused this error
 */
export interface DispatchError {
  code?: ErrorsEnum | string,
  message: string,
  action: string
}


