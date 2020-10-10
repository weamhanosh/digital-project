import {MyEditorActionsConstants} from './constants'
import {MyRadioActionsConstants} from '../MyRadio/constants'
import initialState from '../../initialState'

const MyEditorReducer = (state = initialState.myEditor, action) => {
    switch (action.type) {

        case MyEditorActionsConstants.EDIT_TEXT_ACTION:{
            state = state.set('text', action.payload); 
            return state;
        }

        case MyRadioActionsConstants.CHANGE_INPUT_ACTION:{
            state = state.set('text', "");
            return state;
        }

        default: //otherwise state is lost!
            return state;
    }
};

export default MyEditorReducer;
