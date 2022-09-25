import { IControls, TControls } from '../../types';

export interface IRenderProps {
    controlVal: string;
    controls: IControls;
    currentTime: number;
    playState: boolean;
    setActiveStage: (index: number) => void;
    handleChangeControl: (controlId: string, control: TControls) => void;
    setPlayState: (state: boolean) => void;
    handleChangeCurrentTime: (currentTime: number) => void;
}

export type TRenderComponent = React.FC<IRenderProps>;
