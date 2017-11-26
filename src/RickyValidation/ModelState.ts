import { IValidateProvider, DefaultProvider } from './ValidateProvider';
import { valueType, factory } from './Consts';

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
    public isValid(model: T): boolean {
        // 重新放入標準模型內，防止model是由 any進入(在JS中的弱型別會失去模型的標籤)
        Object.assign(this._validModel, model);

        // 驗證property
        let protokeys: Array<string> = Object.getPrototypeOf(this._validModel);
        for (var protoKey in protokeys) {
            if (protoKey !== 'isValid' && !this.isValidate(this._validModel, protoKey)) { this._isValid = false; }
        }

        /// 驗證field
        let propertyKeys: Array<string> = Object.getOwnPropertyNames(this._validModel);
        for (var propertykey in propertyKeys) {
            if (propertykey !== 'isValid' && !this.isValidate(this._validModel, propertyKeys[propertykey])) {
                this._isValid = false;
            }
        }
        return this._isValid;
    }
    public getErrorSummary(): string[] {
        return this._provider.errorSummary;
    }
    // 工廠驗證
    private isValidate(target: T, propertyKey: string): boolean {

        let result: boolean = true;
        for (let decortor in factory) {
            let metaData = this.getMetadata(factory[decortor], target, propertyKey);
            let value: valueType = Reflect.get(<Object>target, propertyKey);
            if (metaData) {
                if(!this._provider[factory[decortor] + 'Handler'](value, metaData)){ result = false;}
            }
        }
        return result;
        // let requiredMetaData = this.getMetadata(requiredMetadataKey, target, propertyKey);
        // if (requiredMetaData) {
        //     let value: valueType = Reflect.get(<Object> target, propertyKey);
        //     return this._provider.validRequiredHandler(value, requiredMetaData);
        // }
        // let emailMetadata = this.getMetadata(emailMetadataKey, target, propertyKey);
        // if (emailMetadata) {
        //     return true;
        // }
        // return true;
    }

    // 取得標籤及內容
    private getMetadata = (metadataKey: string, target: T, propertyKey: string) => {
        let metaData =
            Reflect.getMetadata(metadataKey, target, propertyKey);
        return metaData;
    }
}