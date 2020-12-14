/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-11
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: @mconnect/res-messages, response-messages | utility functions
 */

import { stdResMessages } from "./stdResMessages";

export interface ResponseMessage {
    code: string;
    resCode: number;
    resMessage: string;
    message: string;
    value: any;
}

export interface ResponseMessageOptions {
    message?: string;
    value?: any;
}

function msgFunc(code: string, resCode: number, resMessage: string, msg: string, value: any): ResponseMessage {
    return {
        code      : code,
        resCode   : resCode,
        resMessage: resMessage,
        value     : value,
        message   : msg,
    };
}

export function getResMessage(msgType: string, options?: ResponseMessageOptions): ResponseMessage {
    let value: any,
        code: string,
        resCode: number,
        resMessage: string,
        message: string;

    if (msgType && stdResMessages[msgType]) {
        code = stdResMessages[msgType].code;
        value = options && options.value ? options.value : stdResMessages[msgType].value;
        resCode = stdResMessages[msgType].resCode;
        resMessage = stdResMessages[msgType].resMessage;
        message = options && options.message ? `${stdResMessages[msgType].message} | ${options.message}` : stdResMessages[msgType].message;
    } else {
        // use stdResMessages default response
        value = options && options.value ? options.value : stdResMessages["unknown"].value;
        code = msgType || stdResMessages["unknown"].code;
        resCode = stdResMessages["unknown"].resCode;
        resMessage = stdResMessages["unknown"].resMessage;
        message = options && options.message ? `${stdResMessages["unknown"].message} | ${options.message}` : stdResMessages["unknown"].message;
    }
    return msgFunc(code, resCode, resMessage, message, value);
}
