import { MyAnalyzeButtonActionsConstants } from './constants';

function uploadAction(text) {
  return {
    type: MyAnalyzeButtonActionsConstants.UPLOAD_ACTION,
    uri: '/api/upload',
    payload: text
  }
}

function doneAction(output){
  return {
    type: MyAnalyzeButtonActionsConstants.DONE_ACTION,
    payload: output
  }
}

function failureAction(){
  return {
    type: MyAnalyzeButtonActionsConstants.FAILURE_ACTION
  }
}


let MyAnalyzeButtonActions = {
  uploadAction,
  doneAction,
  failureAction
};

export default MyAnalyzeButtonActions;
