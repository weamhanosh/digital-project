import {MyAnalyzeButtonActionsConstants} from './constants'
import {MyRadioActionsConstants} from '../MyRadio/constants'
import initialState from '../../initialState'

const MyAnalyzeButtonReducer = (state = initialState.myAnalyzeButton, action) => {
    console.log('MyAnalyzeButtonReducerState=', state);
    switch (action.type) {

        case MyAnalyzeButtonActionsConstants.UPLOAD_ACTION:{
            console.log('RECEIVED: MyAnalyzeButtonActionsConstants.UPLOAD_ACTION');
            console.log('ACTION:', action);
            state = state.set('render_progress_bar', true);
            state = state.set('failed', false);
            state = state.set('done', false);
            console.log('NEW STATE=', state);
            return state;
        }

        case MyAnalyzeButtonActionsConstants.UPLOAD_FILES_ACTION:{
            console.log('RECEIVED: MyAnalyzeButtonActionsConstants.UPLOAD_FILES_ACTION');
            console.log('ACTION:', action);
            state = state.set('render_progress_bar', true);
            state = state.set('failed', false);
            state = state.set('done', false);
            console.log('NEW STATE=', state);
            return state;
        }

        case MyAnalyzeButtonActionsConstants.DONE_ACTION:{
            console.log('RECEIVED: MyAnalyzeButtonActionsConstants.DONE_ACTION');
            console.log('ACTION:', action);
            state = state.set('render_progress_bar', false);
            state = state.set('done', true);
            state = state.set('failed', false);
            state = state.set('answer', action.payload.analysed_text_arr);
            state = state.set('analysis_as_is', action.payload.analysis_as_is);
            state = state.set('newline_counter', action.payload.newline_counter);
            state = state.set('line_length_arr', action.payload.line_length_arr);
            console.log('NEW STATE=', state);
            return state;
        }

        case MyAnalyzeButtonActionsConstants.DONE_FILES_ACTION:{
            console.log('RECEIVED: MyAnalyzeButtonActionsConstants.DONE_FILES_ACTION');
            console.log('ACTION:', action);
            state = state.set('render_progress_bar', false);
            state = state.set('done', true);
            state = state.set('failed', false);
            let answer_array = [];
            let analysis_as_is_array = [];
            let newline_counter_array = [];
            let line_length_arr_array = [];
            let file_name_array = [];
            let text_array = [];
            for (let i = 0; i < action.payload.length; i++){
                answer_array[i] = action.payload[i].analysed_text_arr;
                analysis_as_is_array[i] = action.payload[i].analysis_as_is;
                newline_counter_array[i] = action.payload[i].newline_counter;
                line_length_arr_array[i] = action.payload[i].line_length_arr;
                file_name_array[i] = action.payload[i].file_name;
                text_array[i] = action.payload[i].text;
            }
            state = state.set('answer_array', answer_array);
            state = state.set('analysis_as_is_array', analysis_as_is_array);
            state = state.set('newline_counter_array', newline_counter_array);
            state = state.set('line_length_arr_array', line_length_arr_array);
            state = state.set('file_name_array', file_name_array);
            state = state.set('text_array', text_array);
            console.log('NEW STATE=', state);
            return state;
        }

        case MyAnalyzeButtonActionsConstants.FAILURE_ACTION:{
            console.log('RECEIVED: MyAnalyzeButtonActionsConstants.FAILURE_ACTION');
            console.log('ACTION:', action);
            state = state.set('failed', true);
            state = state.set('render_progress_bar', false);
            state = state.set('done', false);
            console.log('NEW STATE=', state);
            return state;
        }

        case MyAnalyzeButtonActionsConstants.FAILURE_FILES_ACTION:{
            console.log('RECEIVED: MyAnalyzeButtonActionsConstants.FAILURE_FILES_ACTION');
            console.log('ACTION:', action);
            state = state.set('failed', true);
            state = state.set('render_progress_bar', false);
            state = state.set('done', false);
            console.log('NEW STATE=', state);
            return state;
        }

        case MyAnalyzeButtonActionsConstants.EMPTY_FILES_ACTION:{
            console.log('RECEIVED: MyAnalyzeButtonActionsConstants.EMPTY_FILES_ACTION');
            console.log('ACTION:', action);
            state = state.set('render_progress_bar', false);
            state = state.set('done', true);
            state = state.set('failed', false);
            state = state.set('answer', []);
            state = state.set('analysis_as_is', "");
            state = state.set('newline_counter', 1);
            state = state.set('line_length_arr', {line_index: 0, line_length: 1});
            console.log('NEW STATE=', state);
            return state;
        }

        case MyRadioActionsConstants.CHANGE_INPUT_ACTION:{
            console.log('RECEIVED: MyRadioActionsConstants.CHANGE_INPUT_ACTION');
            console.log('ACTION:', action);
            state = state.set('done', false);
            state = state.set('render_progress_bar', false);
            state = state.set('failed', false);
            console.log('NEW STATE=', state);
            return state;
        }

        default: //otherwise state is lost!
            return state;
    }
};

export default MyAnalyzeButtonReducer;
