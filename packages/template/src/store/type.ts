import { IProject, TTemplateAction, ITemplateState } from './module/template/type';
import { CombinedState } from 'redux';

interface IState {
    project: ITemplateState;
}

export type TRootState = CombinedState<IState>;

export type TRootAction = TTemplateAction;

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}
