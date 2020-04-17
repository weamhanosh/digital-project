import {MyAnalyzeButtonActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import MyAnalyzeButtonActions from './actions'

function* upload(action){
  // console.log('UploadSaga=', action);
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"text": action.payload})
      });
    const json = yield call([res, 'json']); //retrieve body of response
    // console.log('ServerReturned=', json);
    yield put(MyAnalyzeButtonActions.doneAction(json));
  } catch (e) {
    // console.log("received error:");
    // console.log(e);
    yield put(MyAnalyzeButtonActions.failureAction());
    throw e;
  }
}

function* uploadFiles(action){
  // console.log('UploadFilesSaga=', action);
  // if (action.payload.names.length === 0 && action.payload.texts.length === 0) {
  //   yield put(MyAnalyzeButtonActions.emptyFilesAction());
  // } else {
    try {
      const res = yield call(fetch, action.uri,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(action.payload)
        });
      const json = yield call([res, 'json']); //retrieve body of response
      // console.log('ServerReturned=', json);
      yield put(MyAnalyzeButtonActions.doneFilesAction(json));
    } catch (e) {
      // console.log("received error:");
      // console.log(e);
      yield put(MyAnalyzeButtonActions.failureFilesAction());
      throw e;
    }
  // }
}

function* MyAnalyzeButtonSaga() {
  //using takeEvery, you take the action away from reducer to saga
  yield takeEvery(MyAnalyzeButtonActionsConstants.UPLOAD_ACTION, upload);
  yield takeEvery(MyAnalyzeButtonActionsConstants.UPLOAD_FILES_ACTION, uploadFiles);
}

export default MyAnalyzeButtonSaga;
