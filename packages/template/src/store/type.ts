import { TTemplateAction } from './module/template/type';
import { CombinedState } from 'redux';
import { ITemplateState } from './module/template';

interface IState {
    template: ITemplateState;
}

export type TRootState = CombinedState<IState>;

export type TRootAction = TTemplateAction;

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}
