import { MyFileUploadActionsConstants } from './constants';

function updateFiles(names, texts) {
  return {
    type: MyFileUploadActionsConstants.UPDATE_FILES_ACTION,
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
