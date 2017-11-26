import 'reflect-metadata';
import { requiredMetadataKey, emailMetadataKey } from './Consts';

/**
 * 裝飾器
 */
export module Decortors {
    export class baseDecortorsModel{
        errorMsg?: string;
    }
    export class RequiredModel extends baseDecortorsModel {
        allowEmpty?: boolean;
    }
    /**
     * 不可為空裝飾器
     * @param model 參數
     */
    export function required(model: RequiredModel = { errorMsg: 'Can\'t emtpy', allowEmpty: false }) {
        let resultModel = Reflect.metadata(requiredMetadataKey, model);
        return resultModel;
    }
     /**
     * email裝飾器
     * @param model 參數
     */
    export function email(model: baseDecortorsModel = {errorMsg: 'Can\'t emtpy'}) {
        let resultModel = Reflect.metadata(emailMetadataKey, model);
        return resultModel;
    }
}