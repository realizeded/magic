import { IControls, TControls } from '../../types';

export interface IAnimateProps {
    controlVal: string;
    controls: IControls;
    currentTime: number;
    setActiveStage: (index: number) => void;
    playState: boolean;
    handleChangeControl: (controlId: string, control: TControls) => void;
    setPlayState: (state: boolean) => void;
    handleChangeCurrentTime: (currentTime: number) => void;
}

export type TAnimateComponent = React.FC<IAnimateProps>;
