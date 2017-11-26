import 'reflect-metadata';
import { requiredMetadataKey } from './Consts';

/**
 * 裝飾器
 */
export module Decortors {
    
    export class RequiredModel {
        errorMsg?: string;
        allowEmpty?: boolean;
    }
    /**
     * 不可為空裝飾器
     * @param requiredModel 參數
     */
    export function required(requiredModel: RequiredModel = { errorMsg: 'Can\'t emtpy', allowEmpty: false }) {
        let resultModel = Reflect.metadata(requiredMetadataKey, requiredModel);
        return resultModel;
    }
}