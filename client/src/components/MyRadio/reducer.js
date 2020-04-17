import {MyRadioActionsConstants} from './constants'
import initialState from '../../initialState'
// import { List } from 'immutable'

const MyRadioReducer = (state = initialState.myRadio, action) => {
    console.log('MyRadioReducerState=', state);
    switch (action.type) {

        case MyRadioActionsConstants.CHANGE_INPUT_ACTION:{
            console.log('RECEIVED: MyRadioActionsConstants.CHANGE_INPUT_ACTION');
            console.log('ACTION:', action);
            state = state.set('render_editor', action.payload);
            console.log('NEW STATE=', state);
            return state;
        }

        default: //otherwise state is lost!
            return state;
    }
};

export default MyRadioReducer;
