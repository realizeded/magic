export const ptToRem = (pxNum: string | any) => {
    if (!pxNum) {
        return '';
    }
    const num = pxNum.replace('px', '');

    return Number(num) / 100 + 'rem';
};
