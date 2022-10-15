import { TRootState, TRootAction } from './type';
import { createStore, combineReducers, compose } from 'redux';
import { templateReducer } from './module/template';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    project: templateReducer
});
export const store = createStore<TRootState, TRootAction, unknown, unknown>(reducer, composeEnhancers);
