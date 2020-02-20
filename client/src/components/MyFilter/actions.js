import { MyFilterActionsConstants } from './constants';

function changeOptions(option){
  return {
    type: MyFilterActionsConstants.CHANGE_OPTIONS_ACTION,
    payload: option
  }
}

let MyFilterActions = {
  changeOptions
};

export default MyFilterActions;
