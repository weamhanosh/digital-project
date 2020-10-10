import {MyRadioActionsConstants} from './constants'
import initialState from '../../initialState'

const MyRadioReducer = (state = initialState.myRadio, action) => {
    switch (action.type) {

        case MyRadioActionsConstants.CHANGE_INPUT_ACTION:{
            state = state.set('render_editor', action.payload);
            return state;
        }

        default: //otherwise state is lost!
            return state;
    }
};

export default MyRadioReducer;
