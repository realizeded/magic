import { IStage, IControls } from './../../../../store/module/template/type';

export interface IRenderProps {
    controls: IControls;
    controlValue: string;
}

export type TRenderComponentType = React.FC<IRenderProps>;
