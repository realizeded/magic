export enum EAnimateType {
    normal = 1,
    scale = 2,
    rotate = 3,
    opacity = 4
}

export enum EFormEfieldType {
    animateType = 'type',
    to = 'to',
    from = 'from',
    start = 'start',
    end = 'end',
    duration = 'duration',
    targetType = 'targetType'
}

export const animateTypeOptions = [
    {
        value: EAnimateType.normal,
        label: '正常'
    },
    {
        value: EAnimateType.scale,
        label: '缩放'
    },
    {
        value: EAnimateType.rotate,
        label: '旋转'
    },
    {
        value: EAnimateType.opacity,
        label: '淡入'
    }
];
