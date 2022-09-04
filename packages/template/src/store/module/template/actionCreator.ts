import {
    CHANGE_CONTROL,
    CHANGE_ACTIVE_INDEX,
    CHANGE_ACTVIE_STAGE_INDEX,
    CREATE_NEW_STAGE,
    DELETE_STAGE
} from './actionTypes';
import { TControls } from './type';

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
