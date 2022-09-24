export enum EFormField {
    name = 'name',
    top = 'top',
    left = 'left',
    width = 'width',
    height = 'height',
    volume = 'volume',
    objectFit = 'backgroundSize',
    Opacity = 'opacity'
}

export const objectFitOptions = [
    {
        value: 'cover',
        label: '拉伸填充'
    },
    {
        value: 'contain',
        label: '内容缩放'
    }
];
