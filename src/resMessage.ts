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

export interface MessageObject {
    [key: string]: string;
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

    const val = stdResMessages[msgType]
    if (val) {
        code = val.code;
        value = options && options.value ? options.value : val.value;
        resCode = val.resCode;
        resMessage = val.resMessage;
        message = options && options.message ? `${options.message}` : val.message;
    } else {
        // use stdResMessages default response
        const val = stdResMessages["unknown"]
        value = options && options.value ? options.value : val.value;
        code = msgType || val.code;
        resCode = val.resCode;
        resMessage = val.resMessage;
        message = options && options.message ? `${options.message}` : val.message;
    }
    return msgFunc(code, resCode, resMessage, message, value);
}

export function getParamsMessage(msgObject: MessageObject, msgType = "paramsError"): ResponseMessage {
    let messages = "";
    Object.entries(msgObject).forEach(([key, msg]) => {
        messages = messages ? `${messages} | ${key} : ${msg}` : `${key} : ${msg}`;
    });
    return getResMessage(msgType, {
        message: messages,
    });
}
