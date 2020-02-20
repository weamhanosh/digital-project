import {MyFilterActionsConstants} from './constants'
import initialState from '../../initialState'

const MyFilterReducer = (state = initialState.myFilter, action) => {
    console.log('MyFilterReducerState=', state);
    switch (action.type) {

        case MyFilterActionsConstants.CHANGE_OPTIONS_ACTION:{
            console.log('RECEIVED: MyFilterActionsConstants.CHANGE_OPTIONS_ACTION');
            console.log('ACTION:', action);
            state = state.set('selected_options', action.payload);
            console.log('NEW STATE=', state);
            return state;
        }

        default: //otherwise state is lost!
            return state;
    }
};

export default MyFilterReducer;
