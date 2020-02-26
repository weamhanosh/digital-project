import { MyAnalyzeButtonActionsConstants } from './constants';

function uploadAction(text) {
  return {
    type: MyAnalyzeButtonActionsConstants.UPLOAD_ACTION,
    // uri: 'http://ec2-52-214-73-236.eu-west-1.compute.amazonaws.com:8000/api/upload',
    uri: 'http://127.0.0.1:8000/api/upload',
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
