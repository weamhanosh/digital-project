import {MyEditorActionsConstants} from './constants'
import initialState from '../../initialState'
// import { List } from 'immutable'

const MyEditorReducer = (state = initialState.myEditor, action) => {
    console.log('MyEditorReducerState=', state);
    switch (action.type) {

        case MyEditorActionsConstants.EDIT_TEXT_ACTION:{
            console.log('RECEIVED: MyEditorActionsConstants.EDIT_TEXT_ACTION');
            console.log('ACTION:', action);
            state = state.set('text', action.payload); 
            console.log('NEW STATE=', state);
            return state;
        }

        default: //otherwise state is lost!
            return state;
    }
};

export default MyEditorReducer;
