import { IValidateProvider, DefaultProvider } from './ValidateProvider';
import { valueType } from './Consts';

export class ModelState<T> {
    private _isValid: boolean = true;
    private _provider: IValidateProvider;
    private _validModel: T;
    /**
     * 建立驗證模型的物件
     * @param type 要進行驗證的型別
     * @param provider 驗證邏輯的提供者
     */
    constructor(type: { new(): T; }, provider?: IValidateProvider) {
        this._provider = new DefaultProvider();
        // 建立標準模型
        this._validModel = new type();
        if (provider) { this._provider = provider; }
    }
    /**
     * 進行驗證
     * @param model 驗證的實體
     */
    public isValid(model: object): boolean {
        // 重新放入標準模型內，防止model是由 any進入(在JS中的弱型別會失去模型的標籤)
        Object.assign(this._validModel, model);
        let p = (obj: object) => {
            for (let key in obj) {
                if (!key.startsWith('_')) {
                    switch (typeof obj[key]) {
                        case 'object':
                            if (obj[key] instanceof Array) {
                                obj[key].forEach((x: object) => { p(x) });
                                if (!this.valid(obj, key)) { this._isValid = false; }
                            } else {
                                p(obj[key]);
                            }
                            break;
                        default:
                            if (!this.valid(obj, key)) { this._isValid = false; }
                            break;
                    }
                }
            }
        };
        p(<Object>this._validModel);
        return this._isValid;
    }
    public getErrorSummary(): string[] {
        return this._provider.errorSummary;
    }
    // 工廠驗證
    private valid(target: object, propertyKey: string): boolean {
        let result: boolean = true;
        let factory = Reflect.getMetadataKeys(target, propertyKey);
        for (let decortor in factory) {
            if (factory[decortor]) {
                let metaData = this.getMetadata(factory[decortor], target, propertyKey);
                let value: valueType = Reflect.get(<Object>target, propertyKey);
                if (metaData) {
                    if (!this._provider[factory[decortor] + 'Handler'](value, metaData)) { result = false; }
                }
            }
        }
        return result;
    }

    // 取得標籤及內容
    private getMetadata = (metadataKey: string, target: object, propertyKey: string) => {
        let metaData =
            Reflect.getMetadata(metadataKey, target, propertyKey);
        return metaData;
    }
}