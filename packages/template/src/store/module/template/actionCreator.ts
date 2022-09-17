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
    CHANGE_CONTRL_ZINDEX
} from './actionTypes';
import { TControls, ITemplate } from './type';

export const getChangeControlAction = (id: string, control: TControls) => {
    return {
        type: CHANGE_CONTROL,
        data: { id, control }
    };
};

export const getChangeActiveIndexAction = (id: string) => {
    return {
        type: CHANGE_ACTIVE_INDEX,
        data: id
    };
};

export const getChangeActiveStageIndexAction = (index: number) => {
    return {
        type: CHANGE_ACTVIE_STAGE_INDEX,
        data: index
    };
};

export const getCreateNewStageAction = () => {
    return {
        type: CREATE_NEW_STAGE,
        data: null
    };
};

export const getDeleteStageAction = (index: number) => {
    return {
        type: DELETE_STAGE,
        data: index
    };
};

export const getCreateControlAction = (control: TControls) => {
    return {
        type: CREATE_CONTROL_OF_ACTIVE_STAGE,
        data: control
    };
};

export const getSetNewTemplateAction = (template: ITemplate) => {
    return {
        type: SET_NEW_TEMPLATE,
        data: template
    };
};

export const getChangeCurrentTime = (time: number) => {
    return {
        type: CHANGE_CURRENT_TIME,
        data: time
    };
};

export const getTogglePlayState = (state: boolean) => {
    return {
        type: TOGGLE_PLAY_STATE,
        data: state
    };
};

export const getDeleteControl = (controlId: string) => {
    return {
        type: DELTETE_CONTROL,
        data: controlId
    };
};

export const getChangeControlZindex = (changeIndexType: boolean) => {
    return {
        type: CHANGE_CONTRL_ZINDEX,
        data: changeIndexType
    };
};
