import { IControls } from '../../types';

export interface IEventProps {
    controlVal: string;
    controls: IControls;
    currentTime: number;
    playState: boolean;
    setActiveStage: (index: number) => void;
}

export type TEventComponent = React.FC<IEventProps>;
