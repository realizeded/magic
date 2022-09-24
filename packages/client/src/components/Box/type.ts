import { IControls } from './../../../../template/src/store/module/template/type';
export interface IBoxProps {
    controlVal: string;
    controls: IControls;
    currentTime: number;
    playState: boolean;
    setActiveStage: (index: number) => void;
}

export type TBoxComponent = React.FC<IBoxProps>;
