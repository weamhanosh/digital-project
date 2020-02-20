import { combineReducers } from 'redux';
import MyEditorReducer from './components/MyEditor/reducer';
import MyAnalyzeButtonReducer from './components/MyAnalyzeButton/reducer';
import MyPopoverReducer from './components/MyPopover/reducer';
import MyFilterReducer from './components/MyFilter/reducer';

export default combineReducers({
  myEditor: MyEditorReducer,
  myAnalyzeButton: MyAnalyzeButtonReducer,
  myPopover: MyPopoverReducer,
  myFilter: MyFilterReducer,
});
