import {
    CHANGE_CONTROL,
    CHANGE_ACTIVE_INDEX,
    CHANGE_ACTVIE_STAGE_INDEX,
    CREATE_NEW_STAGE,
    DELETE_STAGE,
    CREATE_CONTROL_OF_ACTIVE_STAGE,
    SET_NEW_TEMPLATE,
    CHANGE_CURRENT_TIME,
    TOGGLE_PLAY_STATE,
    DELTETE_CONTROL,
    CHANGE_CONTRL_ZINDEX,
    CHANGE_ACTIVE_STAGE_NAME
} from './actionTypes';
import { Reducer, createStore } from 'redux';
import { initState } from './constant';
import {
    ITemplateState,
    TChangeActiveIndex,
    TTemplateAction,
    TChangeActiveStageIndex,
    TChangeNewStage,
    TDeleteStage,
    TCreateControlOfActiveStage,
    TSetNewTemplate,
    TTogglePlayState,
    TDeleteControl,
    TChangeControlZindex,
    TChangeActiveStageName
} from './type';

import _ from 'lodash';
import { generatorId } from './util';

const actionTypeMapToState = {
    [CHANGE_CONTROL](state: ITemplateState, action: TTemplateAction) {
        const newState = _.cloneDeep(state);
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
        const newState = _.cloneDeep(state);
        newState.project.activeStageIndex = val;
        return { ...newState, project: { ...newState.project, activeIndex: '' } };
    },
    [CREATE_NEW_STAGE](state: ITemplateState, action: TChangeNewStage) {
        const newState = _.cloneDeep(state);
        const newSTage = {
            name: '空白场景',
            value: [],
            posts: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2Fdfdb344e89c70ce3cc0db030f61c45555f82e640.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664864710&t=efea8e64bd411cf4dec2a256c8963072'
        };

        newState.project.template.stages.push(newSTage);

        return { ...newState, project: { ...newState.project } };
    },
    [DELETE_STAGE](state: ITemplateState, action: TDeleteStage) {
        const newState = _.cloneDeep(state);
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
    },
    [CREATE_CONTROL_OF_ACTIVE_STAGE](state: ITemplateState, action: TCreateControlOfActiveStage) {
        const newState = _.cloneDeep(state);
        const control = action.data;
        const project = newState.project;
        const { stages, controls } = project.template;
        const { activeStageIndex } = project;
        const activeStage = stages[activeStageIndex];

        const newControlValue = generatorId(Object.keys(controls));

        activeStage.value.push(newControlValue);
        controls[newControlValue] = control;

        return { ...newState, project: { ...newState.project } };
    },
    [SET_NEW_TEMPLATE](state: ITemplateState, action: TSetNewTemplate) {
        const newState = _.cloneDeep(state);
        const newTemplate = action.data;

        return { ...newState, project: { ...newState.project, template: newTemplate } };
    },
    [CHANGE_CURRENT_TIME](state: ITemplateState, action: TSetNewTemplate) {
        const newState = _.cloneDeep(state);
        const currentTime = action.data;
        return { ...newState, project: { ...newState.project, currentTime } };
    },
    [TOGGLE_PLAY_STATE](state: ITemplateState, action: TTogglePlayState) {
        const newState = _.cloneDeep(state);
        const playState = action.data;
        return { ...newState, project: { ...newState.project, playState, activeIndex: '' } };
    },
    [DELTETE_CONTROL](state: ITemplateState, action: TDeleteControl) {
        const newState = _.cloneDeep(state);
        const controlId = action.data;
        let activeIndex = newState.project.activeIndex;
        if (controlId === activeIndex) {
            activeIndex = '';
        }
        const { project } = newState;
        const { activeStageIndex, template } = project;
        const { stages, controls } = template;
        delete controls[controlId];
        const activeStage = stages[activeStageIndex];
        activeStage.value = activeStage.value.filter(val => val !== controlId);

        return { ...newState, project: { ...newState.project, activeIndex } };
    },
    [CHANGE_CONTRL_ZINDEX](state: ITemplateState, action: TChangeControlZindex) {
        const newState = _.cloneDeep(state);
        const isUp = action.data;

        const { project } = newState;
        const { activeStageIndex, template, activeIndex } = project;
        const { stages } = template;
        const activeStage = stages[activeStageIndex];
        const activeStageValues = activeStage.value;
        const controlIdIndexOfValue = activeStageValues.indexOf(activeIndex);
        activeStageValues.splice(controlIdIndexOfValue, 1);

        if (isUp) {
            activeStageValues.splice(controlIdIndexOfValue - 1, 0, activeIndex);
        } else {
            activeStageValues.splice(controlIdIndexOfValue + 1, 0, activeIndex);
        }
        return { ...newState, project: { ...newState.project } };
    },
    [CHANGE_ACTIVE_STAGE_NAME](state: ITemplateState, action: TChangeActiveStageName) {
        const newState = _.cloneDeep(state);
        const stageName = action.data;
        const { template, activeStageIndex } = newState.project;

        const activeStage = template.stages[activeStageIndex];

        activeStage.name = stageName;
        return { ...newState };
    }
};
export const templateReducer: Reducer<ITemplateState, TTemplateAction> = (state = initState, action) => {
    const processFn = actionTypeMapToState[action.type];

    if (processFn) {
        return processFn(state, action);
    }
    return state;
};
