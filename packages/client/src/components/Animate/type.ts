import { IControls } from '../../types';

export interface IAnimateProps {
    controlVal: string;
    controls: IControls;
    currentTime: number;
    setActiveStage: (index: number) => void;
    playState: boolean;
}

export type TAnimateComponent = React.FC<IAnimateProps>;
