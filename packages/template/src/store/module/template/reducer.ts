import { CHANGE_CONTROL, CHANGE_ACTIVE_INDEX } from './actionTypes';
import { Reducer, createStore } from 'redux';
import { initState } from './constant';
import { ITemplateState, TChangeActiveIndex, TTemplateAction } from './type';

const actionTypeMapToState = {
    [CHANGE_CONTROL](state: ITemplateState, action: TTemplateAction) {
        const data = action.data;

        const { id, control } = data;

        const controls = state.project.template.controls;
        const newControls = { ...controls };
        newControls[id] = control;
        state.project.template.controls = newControls;
        return state;
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
