import { CHANGE_CONTROL, CHANGE_ACTIVE_INDEX } from './actionTypes';
import { Reducer, createStore } from 'redux';
import { initState } from './constant';
import { ITemplateState, TChangeActiveIndex, TTemplateAction } from './type';

import _ from 'lodash';

const actionTypeMapToState = {
    [CHANGE_CONTROL](state: ITemplateState, action: TTemplateAction) {
        const newState = _.clone(state);
        const data = action.data;
        const { id, control } = data;
        newState.project.template.controls[id] = control;

        return { ...newState, project: { ...newState.project } };
    },
    [CHANGE_ACTIVE_INDEX](state: ITemplateState, action: TChangeActiveIndex) {
        const val = action.data;

        return {
            ...state,
            project: {
                ...state.project,
                activeIndex: val
            }
        };
    }
};
export const templateReducer: Reducer<ITemplateState, TTemplateAction> = (state = initState, action) => {
    const processFn = actionTypeMapToState[action.type];

    if (processFn) {
        return processFn(state, action);
    }
    return state;
};
