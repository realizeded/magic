import { IControls, IStage } from '../../../../store/module/template';

export interface IAnimateProps {
    stage: IStage;
    controls: IControls;
    activeIndex: string;
    controlValue: string;
    scaleCanvas: number;
    currentTime: number;
    playState: boolean;
}

export type TAnimateComponentType = React.FC<IAnimateProps>;
