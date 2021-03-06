import { Decortors } from '../RickyValidation/Decortors';

export class Model {
    /**
     *
     */
    constructor() {
        this.detail = new Array<Detail>();
        // this.detail.push(new Detail());
        // this.detail.push(new Detail());
        // this.detail.push(new Detail());
    }
    // @Decortors.required({ errorMsg: () => 'Function Error' })
    public qq: string = ''; // 一定要給初始值，js原生物件上，field若不給值，不會有這一個欄位，會無法驗證

    private _name: string = '';
    // @Decortors.required()
    public get name(): string { return this._name; } // 屬性不需要給，會存在prototype中
    public set name(v: string) { this._name = v; }

    private _email: string;
    @Decortors.email()
    public get email(): string { return this._email; }
    public set email(v: string) { this._email = v; }

    private _detail: Detail[];
    @Decortors.required()
    public get detail(): Detail[] { return this._detail; }
    public set detail(v: Detail[]) { this._detail = v; }

}
export class Detail {
    @Decortors.required()
    public detailName: string = '';
}