import { EEventType, ETargetEventType } from './../../../../../../store/module/template/type';

export enum EFormEfieldType {
    targetType = 'targetType',
    eventType = 'eventType',
    jumpTargetTime = 'jumpTargetTime',
    time = 'time'
}

export const animateTypeOptions = [
    {
        value: EEventType.Click,
        label: '点击'
    },
    {
        value: EEventType.Auto,
        label: '自动触发'
    }
];

export const targetEventOptions = [
    {
        value: ETargetEventType.jumpPlay,
        label: '跳转播放'
    },
    {
        value: EEventType.Auto,
        label: '自动触发'
    }
];
