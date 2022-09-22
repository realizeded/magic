export enum EFormField {
    name = 'name',
    top = 'top',
    left = 'left',
    width = 'width',
    height = 'height',
    volume = 'volume',
    objectFit = 'objectFit'
}

export const objectFitOptions = [
    {
        value: 'cover',
        label: '拉伸填充'
    },
    {
        value: 'contain',
        label: '内容缩放'
    },
    {
        value: 'fill',
        label: '内容铺满'
    },
    {
        value: 'scale-down',
        label: '缩放展示'
    }
];
