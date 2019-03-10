import { createStore, applyMiddleware, compose } from 'redux';
//import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

const initialState = {};

//const middleware = [ thunk ];
const sagaMiddleware = createSagaMiddleware();

//const middleware = [ sagaMiddleware ];

let middlewares = applyMiddleware(sagaMiddleware);

const store = createStore(rootReducer, initialState, compose(middlewares, window.__REDUX_DEVTOOLS_EXTENSION__()));

sagaMiddleware.run(rootSaga);

export default store;
