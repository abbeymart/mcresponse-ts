/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-11 | @Updated: 2026-06-05
 * @Company: Copyright 2020 Abi Akindele | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc: success scenarios testing
 * RUN command: ts-node <path-to-test-scripts-file>
 */

import { newTest, testResult, UnitTestResult } from '@mconnect/mctest';
import { getResMessage, Status } from '../src';

let msgType = 'success',
    options = {
        value  : ['a', 'b', 'c'],
        code   : '',
        message: '',
    },
    res = {
        code      : 'success',
        resCode   : Status.OK,
        resMessage: 'OK',
        value     : '',
        message   : 'Request completed successfully',
    };

(async () => {
    const results: Array<UnitTestResult> = []

    const test1 = newTest({
        name: 'should return success code for success-message',
    })
    test1.setTestFunction(() => {
        const req = getResMessage(msgType, options);
        test1.assertEquals(res.code, req.code, `response-code should be: ${res.code}`);
        test1.assertNotEquals(req.code, 'unAuthorized');
    })
    const test1Result = test1.runTest()
    results.push(test1Result)

    const test2 = newTest({
        name: 'should return ok/200 resCode for success-message',
    })
    test2.setTestFunction(() => {
        const req = getResMessage(msgType);
        test2.assertEquals(res.resCode, req.resCode, `resCode should be: ${res.resCode}`);
        test2.assertEquals(res.resMessage, req.resMessage, `resCode should be: ${res.resMessage}`);
    })
    const test2Result = test2.runTest()
    results.push(test2Result)

    const test3 = newTest({
        name: 'should return Completed successfully message for success-message',
    })
    test3.setTestFunction(() => {
        const req = getResMessage(msgType, options);
        test3.assertEquals(res.message, req.message, `message should be: ${res.message}`);
    })
    const test3Result = test3.runTest()
    results.push(test3Result)

    const test4 = newTest({
        name: 'should return correct default message',
    })
    test4.setTestFunction(() => {
        options = {
            value  : ['a', 'b', 'c'],
            code   : '',
            message: 'completed successfully',
        }
        const req = getResMessage(msgType, options);
        test4.assertEquals(req.message.includes(options.message), true, `response should be: true`);
    })
    const test4Result = test4.runTest()
    results.push(test4Result)

    const test5 = newTest({
        name: 'should return correct custom message',
    })
    test5.setTestFunction(() => {
        options = {
            value  : ['a', 'b', 'c'],
            code   : '',
            message: 'custom completed successfully',
        }
        const req = getResMessage("authCode", options);
        test5.assertEquals(req.code, "authCode", `response should be: authCode`);
        test5.assertEquals(req.message === options.message, true, `response should be: true`);
    })
    const test5Result = test5.runTest()
    results.push(test5Result)

    testResult(results)

})();
