import { IControls } from '../../types';

export interface IRenderProps {
    controlVal: string;
    controls: IControls;
    currentTime: number;
    playState: boolean;
    setActiveStage: (index: number) => void;
}

export type TRenderComponent = React.FC<IRenderProps>;
