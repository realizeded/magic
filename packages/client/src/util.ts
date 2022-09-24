export const ptToRem = (pxNum: string | any) => {
    if (!pxNum) {
        return '';
    }
    const num = pxNum.replace('px', '');
    console.log(window.bodySize);
    return Number(num) / (window.devicePixelRatio * window.bodySize) + 'rem';
};
