import { CHANGE_CONTROL, CHANGE_ACTIVE_INDEX } from './actionTypes';
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
