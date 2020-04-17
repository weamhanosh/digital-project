import {MyFileUploadActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import MyFileUploadActions from './actions'

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
    yield put(MyFileUploadActions.doneAction(json));
  } catch (e) {
    // console.log("received error:");
    // console.log(e);
    yield put(MyFileUploadActions.failureAction());
    throw e;
  }
}

function* MyFileUploadSaga() {
  //using takeEvery, you take the action away from reducer to saga
  // yield takeEvery(MyFileUploadActionsConstants.UPLOAD_ACTION, upload);
}

export default MyFileUploadSaga;
