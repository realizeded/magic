import { EEventType, ETargetEventType } from '../../../../../../store/module/template/type';

export enum EFormEfieldType {
    targetType = 'targetType',
    eventType = 'eventType',
    jumpTargetTime = 'jumpTargetTime',
    time = 'time',
    nextStage = 'nextStage',
    Opacity = 'opacity',
    OpacityTargetId = 'OpacityTargetId'
}

export const animateTypeOptions = [
    {
        value: EEventType.Click,
        label: '点击'
    }
];

export const targetEventOptions = [
    {
        value: ETargetEventType.jumpPlay,
        label: '跳转播放'
    },
    {
        value: ETargetEventType.toggleStage,
        label: '切换场景'
    },
    {
        value: ETargetEventType.setOpacity,
        label: '改变可见度'
    }
];
