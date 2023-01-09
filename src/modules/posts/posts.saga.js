import { all, call, put, takeEvery, takeLeading } from "redux-saga/effects";
import {
  addPostFailed,
  addPostSuccess,
  ADD_POST,
  getPostsFailed,
  getPostsSuccess,
  GET_POSTS,
} from "./Posts.actions";
import { addPost, getPosts } from "../../utils/api";
import { yieldExpression } from "@babel/types";
import { delay } from "q";

function* getPostsSaga() {
  try {
    const data = yield call(getPosts);
    yield put(getPostsSuccess(data));
  } catch (error) {
    yield put(getPostsFailed(error.message));
  }
}

function* getPostWatcher() {
  yield takeEvery(GET_POSTS, getPostsSaga);
}

function* addPostsSaga(action) {
  try {
    const data = yield call(addPost, action.payload);
    yield put(addPostSuccess(data));
  } catch (error) {
    yield put(addPostFailed(error.message));
  }
}
function* addPostsWatcher() {
  yield takeLeading(ADD_POST, addPostsSaga);
}

export default function* postsSaga() {
  yield all([getPostWatcher(), addPostsWatcher()]);
}
