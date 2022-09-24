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
    name: string;
    id: string;
    stages: IStage[];
    controls: IControls;
}

declare global {
    interface Window {
        config: ITemplate;
        bodySize: number;
    }
}
