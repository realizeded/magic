const autoId = () => {
    let str = '';
    for (let i = 0; i < 20; i++) {
        str += Number.parseInt(String(Math.random() * 10000));
    }

    return str;
};

export const generatorId = (arr: string[]): string => {
    const id = autoId();
    if (arr.includes(id)) {
        return generatorId(arr);
    }

    return id;
};
