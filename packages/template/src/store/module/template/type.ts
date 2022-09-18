import { IAction } from '../../type';
import {
    CHANGE_ACTIVE_INDEX,
    CHANGE_CONTROL,
    CHANGE_ACTVIE_STAGE_INDEX,
    CREATE_NEW_STAGE,
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
    SELECT_EVENT_ID
} from './actionTypes';
export interface IBox {
    width: string;
    height: string;
    top?: string;
    left?: string;
    bottom?: string;
    right?: string;
}

export enum EControlTypes {
    Img = 'img',
    Video = 'video',
    Audio = 'audio',
    Text = 'text'
}

export enum EAnimateType {
    Normal = 1,
    Scale = 2,
    Rotate = 3,
    Opacity = 4
}

export interface IAnimateNomal {
    start: number;
    end: number;
    left: number;
    top: number;
    type: EAnimateType.Normal;
    id: string;
    duration: number;
}

export interface IAnimateScale {
    start: number;
    end: number;
    to: number;
    from: number;
    type: EAnimateType.Scale;
    id: string;
    duration: number;
}

export interface IAnimateRotate {
    start: number;
    end: number;
    to: number;
    from: number;
    type: EAnimateType.Scale;
    id: string;
    duration: number;
}

export interface IAnimateOpacity {
    start: number;
    end: number;
    to: number;
    from: number;
    type: EAnimateType.Scale;
    id: string;
    duration: number;
}

export type TAnimate = Array<IAnimateNomal | IAnimateOpacity | IAnimateRotate | IAnimateScale>;

export enum EEventType {
    Click = 1
}

export enum ETargetEventType {
    jumpPlay = 1,
    toggleStage = 2
}

export interface IJumpEvent {
    type: ETargetEventType.jumpPlay;
    start: number;
}

export interface TToggleStage {
    type: ETargetEventType.jumpPlay;
    stageIndex: number;
}

export type TTargetEvent = Array<IJumpEvent | TToggleStage>;

export interface IClickEvent {
    type: EEventType.Click;
    start: number;
    targetEvent: TTargetEvent;
    id: string;
}

export type TEvent = Array<IClickEvent>;
export interface IControlCommon {
    box: IBox;
    name: string;
    animate?: TAnimate;
    event?: TEvent;
}

export type TControlType = EControlTypes.Img;

export interface IStage {
    value: string[];
    name: string;
    posts: string;
}

export interface IImg extends IControlCommon {
    type: EControlTypes.Img;
    data: {
        src: string;
    };
    style: Record<string, string>;
}

export interface IVideo extends IControlCommon {
    type: EControlTypes.Video;
    data: {
        src: string;
        posts: string;
    };
    config: {
        volume: number;
    };
    style: Record<string, string>;
}

export interface IAudio extends IControlCommon {
    type: EControlTypes.Audio;
    data: {
        src: string;
    };
    config: {
        volume: number;
    };
}

export interface IText extends IControlCommon {
    type: EControlTypes.Text;
    data: {
        text: string;
    };
    style: Record<string, string>;
}

export type TControls = IImg | IVideo | IAudio | IText;

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
    scaleCanvas: number;
    currentTime: number;
    playState: boolean;
    selectAnimateId: string;
    selectEventId: string;
}

export interface ITemplateState {
    project: IProject;
}

export type TChangeControlAction = IAction<typeof CHANGE_CONTROL, { id: string; control: TControls }>;
export type TChangeActiveIndex = IAction<typeof CHANGE_ACTIVE_INDEX, string>;
export type TChangeActiveStageIndex = IAction<typeof CHANGE_ACTVIE_STAGE_INDEX, number>;
export type TChangeNewStage = IAction<typeof CREATE_NEW_STAGE, null>;
export type TDeleteStage = IAction<typeof CHANGE_ACTVIE_STAGE_INDEX, number>;
export type TCreateControlOfActiveStage = IAction<typeof CREATE_CONTROL_OF_ACTIVE_STAGE, TControls>;
export type TSetNewTemplate = IAction<typeof SET_NEW_TEMPLATE, ITemplate>;
export type TChangeCurrentTime = IAction<typeof CHANGE_CURRENT_TIME, number>;
export type TTogglePlayState = IAction<typeof TOGGLE_PLAY_STATE, boolean>;
export type TDeleteControl = IAction<typeof DELTETE_CONTROL, string>;
export type TChangeControlZindex = IAction<typeof CHANGE_CONTRL_ZINDEX, boolean>;
export type TChangeActiveStageName = IAction<typeof CHANGE_ACTIVE_STAGE_NAME, string>;
export type TChangeActiveStagePosts = IAction<typeof CHANGE_ACTIVE_STAGE_POST, string>;
export type TChangeScaleCanvas = IAction<typeof CHANGE_SCALE_CANVAS, number>;
export type TCreateAnimate = IAction<typeof CREATE_ANIMATE, EAnimateType>;
export type TSelectAnimateId = IAction<typeof SELECT_ANIMATE_ID, Array<string>>;
export type TCreateEvent = IAction<typeof CREATE_EVENT, string>;
export type TSelectEventId = IAction<typeof SELECT_EVENT_ID, Array<string>>;
export type TTemplateAction = TChangeControlAction;
