import { IAction } from '../../type';
import { CHANGE_ACTIVE_INDEX, CHANGE_CONTROL } from './actionTypes';
export interface IBox {
    width: string;
    height: string;
    top?: string;
    left?: string;
    bottom?: string;
    right?: string;
}

export enum EControlTypes {
    Img = 'img'
}

export interface IControlCommon {
    box: IBox;
}

export type TControlType = EControlTypes.Img;

export interface IStage {
    value: string[];
}

export interface IImg extends IControlCommon {
    type: EControlTypes.Img;
    data: {
        src: string;
    };
}

export type TControls = IImg;

export interface IControls {
    [key: string]: TControls;
}

export interface ITemplate {
    stages: IStage[];
    controls: IControls;
}
export interface IProject {
    template: ITemplate;
    activeIndex: string;
    activeStageIndex: number;
}

export interface ITemplateState {
    project: IProject;
}

export type TChangeControlAction = IAction<typeof CHANGE_CONTROL, { id: string; control: TControls }>;
export type TChangeActiveIndex = IAction<typeof CHANGE_ACTIVE_INDEX, string>;

export type TTemplateAction = TChangeControlAction;
