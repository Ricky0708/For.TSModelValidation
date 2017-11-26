import { IValidateProvider, DefaultProvider } from './ValidateProvider';
import { Decortors } from './Decortors';
import { requiredMetadataKey, valueType } from './Consts';


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

    // 工廠驗證
    private isValidate(target: T, propertyKey: string): boolean {
        let requiredMetaData = this.getRequiredMetadata(target, propertyKey);
        if (requiredMetaData) {
            let value: valueType = Reflect.get(<Object>target, propertyKey);
            return this._provider.validRequiredHandler(value, requiredMetaData.allowEmpty);
        }

        return true;
    }

    // 取得標籤及內容
    private getRequiredMetadata = (target: T, propertyKey: string): Decortors.RequiredModel => {
        let requiredMetaData: Decortors.RequiredModel =
            Reflect.getMetadata(requiredMetadataKey, target, propertyKey);
        return requiredMetaData;
    }
}