import { MyEditorActionsConstants } from './constants';

function editTextField(text){
  return {
    type: MyEditorActionsConstants.EDIT_TEXT_ACTION,
    payload: text
  }
}

let MyEditorActions = {
  editTextField
};

export default MyEditorActions;
