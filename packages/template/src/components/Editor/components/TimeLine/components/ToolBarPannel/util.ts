export const formateTime = (millisecond: number) => {
    const minute = Math.floor(millisecond / (60 * 1000));
    const second = Math.floor((millisecond - minute * (60 * 1000)) / 1000);
    const millSecond = Math.floor(millisecond - minute * (60 * 1000) - second * 1000);

    return `${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}.${millSecond
        .toString()
        .substr(0, 2)}`;
};
