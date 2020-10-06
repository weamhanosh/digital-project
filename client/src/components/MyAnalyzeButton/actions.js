import { MyAnalyzeButtonActionsConstants } from './constants';

function uploadAction(text) {
  return {
    type: MyAnalyzeButtonActionsConstants.UPLOAD_ACTION,
    // uri: 'http://ec2-52-214-73-236.eu-west-1.compute.amazonaws.com:8000/api/upload',
    uri: 'http://localhost:8000/api/upload',
    payload: text
  }
}

function uploadFilesAction(names, texts) {
  return {
    type: MyAnalyzeButtonActionsConstants.UPLOAD_FILES_ACTION,
    // uri: 'http://ec2-52-214-73-236.eu-west-1.compute.amazonaws.com:8000/api/uploadFiles',
    uri: 'http://localhost:8000/api/uploadFiles',
    payload: {
      names: names,
      texts: texts
    }
  }
}

function doneAction(output){
  return {
    type: MyAnalyzeButtonActionsConstants.DONE_ACTION,
    payload: output
  }
}

function doneFilesAction(outputs){
  return {
    type: MyAnalyzeButtonActionsConstants.DONE_FILES_ACTION,
    payload: outputs
  }
}

function failureAction(){
  return {
    type: MyAnalyzeButtonActionsConstants.FAILURE_ACTION
  }
}

function failureFilesAction(){
  return {
    type: MyAnalyzeButtonActionsConstants.FAILURE_FILES_ACTION
  }
}

function emptyFilesAction(){
  return {
    type: MyAnalyzeButtonActionsConstants.EMPTY_FILES_ACTION
  }
}


let MyAnalyzeButtonActions = {
  uploadAction,
  uploadFilesAction,
  doneAction,
  doneFilesAction,
  failureAction,
  failureFilesAction,
  emptyFilesAction
};

export default MyAnalyzeButtonActions;
