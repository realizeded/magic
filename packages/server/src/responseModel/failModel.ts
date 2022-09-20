export class FailModel {
    private code: string;
    private message?: string;
    constructor(code:string, message = '') {
       this.code = code;
       this.message = message;
    }
}
