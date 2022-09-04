import {
    CHANGE_CONTROL,
    CHANGE_ACTIVE_INDEX,
    CHANGE_ACTVIE_STAGE_INDEX,
    CREATE_NEW_STAGE,
    DELETE_STAGE
} from './actionTypes';
import { Reducer, createStore } from 'redux';
import { initState } from './constant';
import {
    ITemplateState,
    TChangeActiveIndex,
    TTemplateAction,
    TChangeActiveStageIndex,
    TChangeNewStage,
    TDeleteStage
} from './type';

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
    },
    [CHANGE_ACTVIE_STAGE_INDEX](state: ITemplateState, action: TChangeActiveStageIndex) {
        const val = action.data;
        const newState = _.clone(state);
        newState.project.activeStageIndex = val;
        return { ...newState, project: { ...newState.project, activeIndex: '' } };
    },
    [CREATE_NEW_STAGE](state: ITemplateState, action: TChangeNewStage) {
        const newState = _.clone(state);
        const newSTage = {
            name: '空白场景',
            value: [],
            posts: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2Fdfdb344e89c70ce3cc0db030f61c45555f82e640.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664864710&t=efea8e64bd411cf4dec2a256c8963072'
        };

        newState.project.template.stages.push(newSTage);

        return { ...newState, project: { ...newState.project } };
    },
    [DELETE_STAGE](state: ITemplateState, action: TDeleteStage) {
        const newState = _.clone(state);
        const index = action.data;
        const project = newState.project;
        const activeStageIndex = project.activeStageIndex;
        let newActiveStageIndex = activeStageIndex;
        if (activeStageIndex === index) {
            if (index === 0) {
                newActiveStageIndex += 1;
            } else {
                newActiveStageIndex -= 1;
            }
        }
        const stages = project.template.stages;
        stages.splice(index, 1);
        return { ...newState, project: { ...newState.project, activeStageIndex: newActiveStageIndex } };
    }
};
export const templateReducer: Reducer<ITemplateState, TTemplateAction> = (state = initState, action) => {
    const processFn = actionTypeMapToState[action.type];

    if (processFn) {
        return processFn(state, action);
    }
    return state;
};
