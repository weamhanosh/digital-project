import {MyAnalyzeButtonActionsConstants} from './constants'
import initialState from '../../initialState'

const MyAnalyzeButtonReducer = (state = initialState.myAnalyzeButton, action) => {
    // console.log('MyAnalyzeButtonReducerState=', state);
    switch (action.type) {

        case MyAnalyzeButtonActionsConstants.UPLOAD_ACTION:{
            // console.log('RECEIVED: MyAnalyzeButtonActionsConstants.UPLOAD_ACTION');
            // console.log('ACTION:', action);
            state = state.set('render_progress_bar', true);
            state = state.set('failed', false);
            state = state.set('done', false);
            // console.log('NEW STATE=', state);
            return state;
        }

        case MyAnalyzeButtonActionsConstants.DONE_ACTION:{
            // console.log('RECEIVED: MyAnalyzeButtonActionsConstants.DONE_ACTION');
            // console.log('ACTION:', action);
            state = state.set('render_progress_bar', false);
            state = state.set('done', true);
            state = state.set('failed', false);
            state = state.set('answer', action.payload.analysed_text_arr);
            state = state.set('analysis_as_is', action.payload.analysis_as_is);
            state = state.set('newline_counter', action.payload.newline_counter);
            state = state.set('line_length_arr', action.payload.line_length_arr);
            // console.log('NEW STATE=', state);
            return state;
        }

        case MyAnalyzeButtonActionsConstants.FAILURE_ACTION:{
            // console.log('RECEIVED: MyAnalyzeButtonActionsConstants.FAILURE_ACTION');
            // console.log('ACTION:', action);
            state = state.set('failed', true);
            state = state.set('render_progress_bar', false);
            state = state.set('done', false);
            // console.log('NEW STATE=', state);
            return state;
        }

        default: //otherwise state is lost!
            return state;
    }
};

export default MyAnalyzeButtonReducer;
