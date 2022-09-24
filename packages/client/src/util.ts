export const ptToRem = (pxNum: string | any) => {
    if (!pxNum) {
        return '';
    }
    const num = pxNum.replace('px', '');

    return Number(num) / (2 * window.bodySize) + 'rem';
};
