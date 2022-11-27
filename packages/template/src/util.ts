export const getUrl = (): string => {
    const isOnline = process.env.NODE_ENV !== 'development';

    // return window.isOnline ? 'http://150.158.141.76:8800' : 'http://localhost:8800';
    return isOnline ? 'https://client.lmagic.work' : 'http://localhost:8800';
};

export class Dep {
    private ids: Array<number> = [];
    private idMap: Record<string, Array<() => void>> = {};
    addIds(id: number) {
        this.ids.push(id);
    }
    on(key: string, fn: () => void) {
        const mapArr = this.idMap[key] || [];
        this.idMap[key] = [...mapArr, fn];
    }
    emit(key: string) {
        const mapArr = this.idMap[key] || [];
        mapArr.forEach(callback => callback());
    }
    includes(id: number) {
        return this.ids.includes(id);
    }
}

export const dep = new Dep();
