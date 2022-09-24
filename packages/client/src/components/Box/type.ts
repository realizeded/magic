import { IControls, TControls } from './../../../../template/src/store/module/template/type';
export interface IBoxProps {
    controlVal: string;
    controls: IControls;
    currentTime: number;
    playState: boolean;
    setActiveStage: (index: number) => void;
    handleChangeControl: (controlId: string, control: TControls) => void;
    setPlayState: (state: boolean) => void;
    handleChangeCurrentTime: (currentTime: number) => void;
}

export type TBoxComponent = React.FC<IBoxProps>;
