import { Reducer, createStore } from 'redux';
import { initState } from './constant';
import { ITemplateState, TTemplateAction } from './type';

export const templateReducer: Reducer<ITemplateState, TTemplateAction> = (state = initState, action) => {
    return state;
};
