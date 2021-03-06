import {MyFileUploadActionsConstants} from './constants'
import {MyRadioActionsConstants} from '../MyRadio/constants'
import initialState from '../../initialState'

const MyFileUploadReducer = (state = initialState.myFileUpload, action) => {
    switch (action.type) {

        case MyFileUploadActionsConstants.UPDATE_FILES_ACTION:{
            state = state.set('names', []);
            state = state.set('texts', []);
            for (let i = 0; i < action.payload.names.length; i++){
                let names = state.get('names');
                let texts = state.get('texts');
                names.push(action.payload.names[i])
                texts.push(action.payload.texts[i])
                state = state.set('names', names);
                state = state.set('texts', texts);
            }
            return state;
        }

        case MyFileUploadActionsConstants.DONE_ACTION:{
            state = state.set('render_progress_bar', false);
            state = state.set('done', true);
            state = state.set('failed', false);
            state = state.set('answer', action.payload.analysed_text_arr);
            state = state.set('analysis_as_is', action.payload.analysis_as_is);
            state = state.set('newline_counter', action.payload.newline_counter);
            state = state.set('line_length_arr', action.payload.line_length_arr);
            return state;
        }

        case MyFileUploadActionsConstants.DONE_FILES_ACTION:{
            state = state.set('render_progress_bar', false);
            state = state.set('done', true);
            state = state.set('failed', false);
            state = state.set('answer', action.payload.analysed_text_arr);
            state = state.set('analysis_as_is', action.payload.analysis_as_is);
            state = state.set('newline_counter', action.payload.newline_counter);
            state = state.set('line_length_arr', action.payload.line_length_arr);
            return state;
        }

        case MyFileUploadActionsConstants.FAILURE_ACTION:{
            state = state.set('failed', true);
            state = state.set('render_progress_bar', false);
            state = state.set('done', false);
            return state;
        }

        case MyRadioActionsConstants.CHANGE_INPUT_ACTION:{
            state = state.set('names', []);
            state = state.set('texts', []);
            return state;
        }

        default: //otherwise state is lost!
            return state;
    }
};

export default MyFileUploadReducer;
