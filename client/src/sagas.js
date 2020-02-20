import { all } from 'redux-saga/effects'
import MyAnalyzeButtonSaga from './components/MyAnalyzeButton/saga'

export default function* Sagas() {
    yield all([
        MyAnalyzeButtonSaga()
    ])
}
