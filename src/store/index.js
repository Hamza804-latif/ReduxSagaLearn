import createSagaMiddleware from "@redux-saga/core";
import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducer";
import logger from "redux-logger";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

// const withDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [sagaMiddleware, logger];

const store = createStore(
  rootReducer,
  // withDevTools(applyMiddleware(sagaMiddleware))
  applyMiddleware(...middlewares)
);

sagaMiddleware.run(rootSaga);

export default store;
