import { MyFileUploadActionsConstants } from './constants';

function updateFiles(names, texts) {
  return {
    type: MyFileUploadActionsConstants.UPDATE_FILES_ACTION,
    // uri: 'http://ec2-52-214-73-236.eu-west-1.compute.amazonaws.com:8000/api/upload',
    // uri: 'http://localhost:8000/api/upload',
    payload: {
      names: names,
      texts: texts
    }
  }
}

function doneAction(output){
  return {
    type: MyFileUploadActionsConstants.DONE_ACTION,
    payload: output
  }
}

function failureAction(){
  return {
    type: MyFileUploadActionsConstants.FAILURE_ACTION
  }
}


let MyFileUploadActions = {
  updateFiles,
  doneAction,
  failureAction
};

export default MyFileUploadActions;
