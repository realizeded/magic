import { IStage, IControls } from './../../../../store/module/template/type';

export interface IRenderProps {
    controls: IControls;
    controlValue: string;
    currentTime: number;
    playState: boolean;
}

export type TRenderComponentType = React.FC<IRenderProps>;
