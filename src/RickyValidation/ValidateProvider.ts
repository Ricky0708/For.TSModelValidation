import { valueType } from './Consts';
import { Decortors } from './Decortors';

/**
 * 驗證提供者的介面
 */
export interface IValidateProvider {

    readonly errorSummary: string[];

    requiredHandler(value: valueType, paramsModel: Decortors.RequiredModel): boolean;
    emailHandler(value: valueType, errorMsg: string): boolean;
}
/**
 * 預設驗證的提供者
 */
export class DefaultProvider implements IValidateProvider {

    private _errorSummary: string[] = [];
    public get errorSummary(): string[] {
        return this._errorSummary;
    }

    requiredHandler(value: valueType, paramsModel: Decortors.RequiredModel): boolean {
        if (!value || (value instanceof Array && value.length === 0)) {
            if (typeof value === 'string' && paramsModel.allowEmpty && value === '') {
                return true;
            }
            if (typeof paramsModel.errorMsg === 'function') {
                this._errorSummary.push(<string>paramsModel.errorMsg());
            } else {
                this._errorSummary.push(<string>paramsModel.errorMsg);
            }
            return false;
        }
        return true;
    }

    emailHandler(value: valueType, errorMsg: string): boolean {
        this._errorSummary.push(errorMsg);
        return false;
    }
}