/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-11
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: @mconnect/res-messages, response-messages | utility functions
 */

import { stdResMessages, ResponseMessage, MessageObject, ResponseMessageOptions, MessageCodes } from "./stdResMessages";
import { Status } from "./netStatusCode";

function msgFunc<T>(res: ResponseMessage<T>): ResponseMessage<T> {
    return {
        code      : res.code,
        message   : res.message,
        value     : res.value,
        resCode   : res.resCode,
        resMessage: res.resMessage,
    };
}

export function getResMessage<T>(msgType: string, options?: ResponseMessageOptions<T>): ResponseMessage<T> {
    let value: T,
        code: string,
        resCode: number,
        resMessage: string,
        message: string;

    const messageType = msgType || options?.msgType || MessageCodes.unknown

    const val = stdResMessages[messageType]
    if (val) {
        code = val.code;
        value = options?.value ? options.value : val.value;
        resCode = val.resCode || Status.NotFound;
        resMessage = val.resMessage || "";
        message = options?.message ? `${options.message}` : val.message;
    } else {
        // use stdResMessages default response
        const val = stdResMessages[MessageCodes.unknown]
        value = options?.value ? options.value : val.value;
        code = messageType || val.code;
        resCode = val.resCode || Status.NotFound;
        resMessage = val.resMessage || "";
        message = options?.message ? `${options.message}` : val.message;
    }
    return msgFunc({code, message, value, resCode, resMessage});
}

export function getParamsMessage<T>(msgObject: MessageObject, msgType = MessageCodes.paramsError): ResponseMessage<T> {
    let messages = "";
    for (const [key, msg] of Object.entries(msgObject)) {
        messages = messages ? `${messages} | ${key} : ${msg}` : `${key} : ${msg}`;
    }
    return getResMessage(msgType, {
        message: messages,
    });
}
