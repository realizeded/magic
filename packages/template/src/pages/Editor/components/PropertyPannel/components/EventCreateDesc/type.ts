import { EFormEfieldType } from './constant';
import { EEventType, ETargetEventType } from '../../../../../../store/module/template/type';

export interface IAnimateCreateDesc {
    [EFormEfieldType.eventType]: EEventType;
    [EFormEfieldType.targetType]: ETargetEventType;
    [EFormEfieldType.jumpTargetTime]: number;
}
