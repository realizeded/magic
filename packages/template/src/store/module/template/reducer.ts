import { selectEventId } from './actionCreator';
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
    CHANGE_ACTIVE_STAGE_NAME,
    CHANGE_ACTIVE_STAGE_POST,
    CHANGE_SCALE_CANVAS,
    CREATE_ANIMATE,
    SELECT_ANIMATE_ID,
    CREATE_EVENT,
    SELECT_EVENT_ID,
    CHANGE_NAME,
    RESET_PROJECT
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
    TChangeActiveStageName,
    TChangeActiveStagePosts,
    TChangeScaleCanvas,
    TCreateAnimate,
    TSelectAnimateId,
    TCreateEvent,
    EEventType,
    ETargetEventType,
    TSelectEventId,
    TChangeProjectName,
    TResetProject
} from './type';

import html2canvas from 'html2canvas';
import _ from 'lodash';
import { generatorId } from './util';

const actionTypeMapToState = {
    [CHANGE_CONTROL](state: ITemplateState, action: TTemplateAction) {
        const newState = _.cloneDeep(state);
        const data = action.data;
        const { id, control } = data;
        newState.project.template.controls[id] = control;

        return { ...newState };
    },
    [CHANGE_ACTIVE_INDEX](state: ITemplateState, action: TChangeActiveIndex) {
        const newState = _.cloneDeep(state);
        const val = action.data;
        return {
            ...state,
            project: {
                ...state.project,
                activeIndex: val,
                selectAnimateId: '',
                selectEventId: ''
            }
        };
    },
    [CHANGE_ACTVIE_STAGE_INDEX](state: ITemplateState, action: TChangeActiveStageIndex) {
        const val = action.data;
        const newState = _.cloneDeep(state);
        newState.project.activeStageIndex = val;
        newState.project.selectAnimateId = '';
        newState.project.selectEventId = '';
        return { ...newState, project: { ...newState.project, activeIndex: '' } };
    },
    [CREATE_NEW_STAGE](state: ITemplateState, action: TChangeNewStage) {
        const newState = _.cloneDeep(state);
        const newSTage = {
            name: '空白场景',
            value: [],
            posts: 'data:image/jpeg;base64,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'
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
        newState.project.selectAnimateId = '';
        newState.project.selectEventId = '';
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
        return {
            ...newState,
            project: {
                ...newState.project,
                playState,
                activeIndex: '',
                selectAnimateId: '',
                selectEventId: ''
            }
        };
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
        newState.project.selectAnimateId = '';
        newState.project.selectEventId = '';
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
        newState.project.selectAnimateId = '';
        newState.project.selectEventId = '';
        return { ...newState };
    },
    [CHANGE_ACTIVE_STAGE_POST](state: ITemplateState, action: TChangeActiveStagePosts) {
        const newState = _.cloneDeep(state);
        const posts = action.data;
        const { template, activeStageIndex } = newState.project;

        const activeStage = template.stages[activeStageIndex];

        activeStage.posts = posts;

        return { ...newState };
    },
    [CHANGE_SCALE_CANVAS](state: ITemplateState, action: TChangeScaleCanvas) {
        const newState = _.cloneDeep(state);
        const scale = action.data;
        newState.project.scaleCanvas = scale;

        return { ...newState };
    },
    [CREATE_ANIMATE](state: ITemplateState, action: TCreateAnimate) {
        const newState = _.cloneDeep(state);
        const animateType = action.data;

        const { project } = newState;

        const { activeIndex, template } = project;

        const { controls } = template;

        const activeControl = controls[activeIndex];

        const animates = activeControl.animate || [];

        const animateIds = animates.map(item => item.id);
        const id = generatorId(animateIds);
        const animate = {
            id,
            type: animateType,
            to: 0,
            from: 0,
            start: 0,
            end: 1,
            duration: 1
        };

        animates.push(animate as any);

        activeControl.animate = animates;
        newState.project.selectAnimateId = id;
        newState.project.selectEventId = '';
        return { ...newState };
    },
    [CREATE_EVENT](state: ITemplateState, action: TCreateEvent) {
        const newState = _.cloneDeep(state);
        const animateType = action.data;

        const { project } = newState;

        const { activeIndex, template } = project;

        const { controls } = template;

        const activeControl = controls[activeIndex];

        const events = activeControl.event || [];

        const eventsId = events.map(item => item.id);
        const id = generatorId(eventsId);
        const eventNew = {
            id,
            type: EEventType.Click,
            start: 6,
            targetEvent: [
                {
                    type: ETargetEventType.jumpPlay,
                    start: 0
                }
            ]
        };

        events.push(eventNew as any);

        activeControl.event = events;
        newState.project.selectEventId = id;
        newState.project.selectAnimateId = '';
        return { ...newState };
    },
    [SELECT_ANIMATE_ID](state: ITemplateState, action: TSelectAnimateId) {
        const newState = _.cloneDeep(state);
        const [id, controlId] = action.data;
        newState.project.selectAnimateId = id;
        newState.project.activeIndex = controlId;
        newState.project.selectEventId = '';
        return { ...newState };
    },
    [SELECT_EVENT_ID](state: ITemplateState, action: TSelectEventId) {
        const newState = _.cloneDeep(state);
        const [id, controlId] = action.data;
        newState.project.selectEventId = id;
        newState.project.activeIndex = controlId;
        newState.project.selectAnimateId = '';
        return { ...newState };
    },
    [CHANGE_NAME](state: ITemplateState, action: TChangeProjectName) {
        const newState = _.cloneDeep(state);
        const name = action.data;
        newState.project.template.name = name;
        return { ...newState };
    },
    [RESET_PROJECT](state: ITemplateState, action: TResetProject) {
        const newState = _.cloneDeep(state);

        newState.project = initState.project;
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
