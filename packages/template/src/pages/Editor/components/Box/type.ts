import { IStage, IControls } from '../../../../store/module/template/type';

export interface IBoxProps {
    stage: IStage;
    controls: IControls;
    activeIndex: string;
    controlValue: string;
    scaleCanvas: number;
    currentTime: number;
    playState: boolean;
}

export type TBoxComponentType = React.FC<IBoxProps>;

export interface IDragPosition {
    x: number;
    y: number;
}

export interface IUseDragProps {
    ref: React.RefObject<HTMLDivElement>;
    dragEnd: (props: IDragPosition) => void;
    dragStart: () => void;
    playState: boolean;
}
