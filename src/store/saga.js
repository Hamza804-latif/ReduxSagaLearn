import { all } from "redux-saga/effects";
import postsSaga from "../modules/posts/posts.saga";

export default function* () {
  yield all([postsSaga()]);
}
