export enum EFormField {
    text = 'text',
    name = 'name',
    fontFamily = 'font-family',
    fontSize = 'fontSize',
    textAlign = 'textAlign',
    verticalAlign = 'verticalAlign',
    color = 'color',
    lineHeight = 'lineHeight',
    wordBreak = 'word-break',
    top = 'top',
    left = 'left',
    width = 'width',
    height = 'height',
    Opacity = 'opacity'
}

export const fontOptions = [
    { label: '默认', value: 'auto' },
    { label: 'Serif', value: 'Serif' },
    { label: 'Sans-serif', value: 'Sans-serif' },
    { label: 'Monospace', value: 'Monospace' },
    { label: 'Cursive', value: 'Cursive' },
    { label: 'Fantasy', value: 'Fantasy' }
];

export const textAlignOption = [
    { label: '左对齐', value: 'left' },
    { label: '居中', value: 'center' },
    { label: '右对齐', value: 'right' }
];

export const verticalAlignOption = [
    { label: '上', value: 'top' },
    { label: '中', value: 'middle' },
    { label: '下', value: 'bottom' }
];
