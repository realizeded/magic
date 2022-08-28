import { IStage, IControls } from './../../../../store/module/template/type';

export interface IRenderProps {
    stage: IStage;
    controls: IControls;
}

export type TRenderComponentType = React.FC<IRenderProps>;
