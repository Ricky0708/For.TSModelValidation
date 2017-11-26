import 'reflect-metadata';
import { requiredMetadataKey, emailMetadataKey } from './Consts';

/**
 * 裝飾器
 */
export module Decortors {
    type StringFunction = () => string
    export class _baseDecortorsModel {
        errorMsg?: string | StringFunction;
    }
    export class RequiredModel extends _baseDecortorsModel {
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
    export function email(model: _baseDecortorsModel = { errorMsg: 'Can\'t emtpy' }) {
        let resultModel = Reflect.metadata(emailMetadataKey, model);
        return resultModel;
    }
  
}