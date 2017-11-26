import { valueType } from './Consts';

/**
 * 驗證提供者的介面
 */
export interface IValidateProvider {
    validRequiredHandler(value: valueType, allowEmpty?: boolean): boolean;
}
/**
 * 預設驗證的提供者
 */
export class DefaultProvider implements IValidateProvider {
    validRequiredHandler(value: valueType, allowEmpty?: boolean): boolean {
        if (!value) {
            if (typeof value === 'string' && allowEmpty && value === '') {
                return true;
            }
            return false;
        }
        return true;
    }

}