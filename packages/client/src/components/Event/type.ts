import { IControls, IStage } from '../../store/module/template';

export interface IEventProps {
    stage: IStage;
    controls: IControls;
    activeIndex: string;
    controlValue: string;
    scaleCanvas: number;
    currentTime: number;
    playState: boolean;
}

export type TEventComponentType = React.FC<IEventProps>;
