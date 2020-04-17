import { MyRadioActionsConstants } from './constants';

function changeInput(option){
  return {
    type: MyRadioActionsConstants.CHANGE_INPUT_ACTION,
    payload: option
  }
}


let MyRadioActions = {
  changeInput
};

export default MyRadioActions;