/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-11 | @Updated: 2026-06-05
 * @Company: Copyright 2020 Abi Akindele | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc: check-error testing
 */

// import mctest from "@mconnect/mctest";
import { newTest, testResult, UnitTestResult } from "@mconnect/mctest";
import { getResMessage, Status } from "../src";

let msgType = 'checkError',
    options = {
        value  : '',
        code   : '',
        message: '',
    },
    res = {
        code      : 'paramsError',
        resCode   : Status.NotAcceptable,
        resMessage: 'Not Acceptable',
        value     : '',
        message   : 'Parameters checking error',
    };

(async () => {

    const results: Array<UnitTestResult> = []

    const test1 = newTest({
        name: 'should return paramsError code for checkError-message',
    })
    test1.setTestFunction(() => {
        const req = getResMessage(msgType, options);
        test1.assertEquals(res.code, req.code, `response-code should be: ${res.code}`);
        test1.assertNotEquals(req.code, 'unAuthorized');
    })
    const test1Result = test1.runTest()
    results.push(test1Result)

    const test2 = newTest({
        name: 'should return NOT_ACCEPTABLE/406 resCode',
    })
    test2.setTestFunction(() => {
        const req = getResMessage(msgType, {});
        test2.assertEquals(res.resCode, req.resCode, `resCode should be: ${res.resCode}`);
        test2.assertEquals(res.resMessage, req.resMessage, `resCode should be: ${res.resMessage}`);
    })
    const test2Result = test2.runTest()
    results.push(test2Result)

    const test3 = newTest({
        name: 'should return Parameters checking error message',
    })
    test3.setTestFunction(() => {
        const req = getResMessage(msgType, options);
        test3.assertEquals(res.message, req.message, `message should be: ${res.message}`);
    })
    const test3Result = test3.runTest()
    results.push(test3Result)

    testResult(results)
})();
