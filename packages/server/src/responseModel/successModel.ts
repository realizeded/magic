export class SuccessModel<T = any> {
    code: string;
    data: T;
    constructor(code: string, data?:T) {
        this.code = code;
        this.data = data;
    }
}

export default SuccessModel;