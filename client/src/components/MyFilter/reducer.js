import {MyFilterActionsConstants} from './constants'
import initialState from '../../initialState'

const MyFilterReducer = (state = initialState.myFilter, action) => {
    switch (action.type) {

        case MyFilterActionsConstants.CHANGE_OPTIONS_ACTION:{
            state = state.set('selected_options', action.payload);
            return state;
        }

        default: //otherwise state is lost!
            return state;
    }
};

export default MyFilterReducer;
