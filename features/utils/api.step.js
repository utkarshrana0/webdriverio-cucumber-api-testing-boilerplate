const { Given, When, Then } = require('@wdio/cucumber-framework');
const assert = require('chai').assert;
const expect = require('chai').expect;
const axios = require('axios');
const fs = require('fs');

let baseURL = "";
let cookieValue = "";
let actual_data = '';
let payload = '';
let apiResponseCode = '';
let apiResponseText = '';

class API{
    static async GET(endpoint, fileName){
        await axios({
            method: 'get',
            headers: { 
                'cookie' : cookieValue,
                'Accept' : '*/*',
                'Connection' : 'keep-alive'
            },
            url: baseURL + endpoint
        }).then(function (response) {
                actual_data = JSON.stringify(response.data);
                console.log(response.status);
                console.log(response.statusText);
                apiResponseCode = response.status;
                apiResponseText = response.statusText;
                assert.strictEqual(response.status, 200);
                expect(response.statusText).to.equal("OK");
                if(fileName != "" && fileName != null){
                    fs.writeFileSync(('.tmp/'+ fileName + '.json'), JSON.stringify(response.data, null, "\t"));
                }
                else{
                    console.log(actual_data);
                }
            })
    }

    static async POST(endpoint){
        await axios({
            method: 'post',
            headers: { 
                'cookie' : cookieValue,
                'Accept' : '*/*',
                'Connection' : 'keep-alive'
            },
            url: baseURL + endpoint,
            data: payload
        }).then(function (response) {
                actual_data = JSON.stringify(response.data);
                console.log(actual_data);
                console.log(response.status);
                console.log(response.statusText);
                apiResponseCode = response.status;
                apiResponseText = response.statusText;
                expect(response.status).to.equal(201);
                assert.strictEqual(response.statusText, "Created");
            });
    }

    static async PUT(endpoint){
        await axios({
            method: 'put',
            headers: { 
                'cookie' : cookieValue,
                'Accept' : '*/*',
                'Connection' : 'keep-alive'
            },
            url: baseURL + endpoint,
            data: payload
        }).then(function (response) {
                actual_data = JSON.stringify(response.data);
                console.log(actual_data);
                console.log(response.status);
                console.log(response.statusText);
                apiResponseCode = response.status;
                apiResponseText = response.statusText;
                assert.strictEqual(response.status, 200);
                expect(response.statusText).to.equal("OK");
            });
    }

    static async PATCH(endpoint){
        await axios({
            method: 'patch',
            headers: { 
                'cookie' : cookieValue,
                'Accept' : '*/*',
                'Connection' : 'keep-alive'
            },
            url: baseURL + endpoint,
            data: payload
        }).then(function (response) {
                actual_data = JSON.stringify(response.data);
                console.log(actual_data);
                console.log(response.status);
                console.log(response.statusText);
                apiResponseCode = response.status;
                apiResponseText = response.statusText;
                assert.strictEqual(response.status, 200);
                expect(response.statusText).to.equal("OK");
            });
    }

    static async DELETE(endpoint){
        await axios({
            method: 'delete',
            headers: { 
                'cookie' : cookieValue,
                'Accept' : '*/*',
                'Connection' : 'keep-alive'
            },
            url: baseURL + endpoint
        }).then(function (response) {
                actual_data = JSON.stringify(response.data);
                console.log(actual_data);
                console.log(response.status);
                console.log(response.statusText);
                apiResponseCode = response.status;
                apiResponseText = response.statusText;
                assert.strictEqual(response.status, 204);
                expect(response.statusText).to.equal("No Content");
            }); 
    }
}
module.exports = API;

Given(/^Base URL is "([^"]*)"$/, async function(url){
    baseURL = await url;
});

When(/^I get browser cookies and generate access token$/, async function(){
    // let vcap = await browser.getNamedCookie("__VCAP_ID__");
    let vcap = await browser.getCookies("__VCAP_ID__");
    let vcap_string = await vcap["value"];
    // let jSession = await browser.getNamedCookie("JSESSIONID");
    let jSession = await browser.getCookies("JSESSIONID");
    let jSession_string = await jSession["value"]
    cookieValue = "JSESSIONID=" + jSession_string + "; __VCAP_ID__=" + vcap_string;
    console.log('\n'+cookieValue+'\n');

    // let cookie = await browser.getCookies();
    // let cookieValue = await JSON.stringify(cookie);



    // console.error('\n'+cookieValue+'\n');
});

Then(/^I GET from path "([^"]*)"$/, async function(endpoint) {
    const getResponse = await API.GET(endpoint)
    return getResponse   
});

Then(/^I GET from path "([^"]*)" and save response as "([^"]*)"$/, async function(endpoint, fileName){
    const getResponse = await API.GET(endpoint, fileName)
    return getResponse
});

Then(/^I assert that HTTP GET response data matches "([^"]*)"$/, async function(fileName) {
    let raw_expected_data = fs.readFileSync('./dataFiles/API/' + fileName + '.json')
    let expected_data = await JSON.parse(raw_expected_data)
    assert.equal(actual_data, JSON.stringify(expected_data))
});

When(/^I set "([^"]*)" as payload$/, async function(fileName){
    let raw_payload = fs.readFileSync('./dataFiles/API/' + fileName + '.json')
    payload = await JSON.parse(raw_payload)
});

Then(/^I POST to path "([^"]*)"$/, async function(endpoint){
    const postResponse = await API.POST(endpoint)
    return postResponse
});

Then(/^I PUT to path "([^"]*)"$/, async function(endpoint){
    const putResponse = await API.PUT(endpoint)
    return putResponse
});

Then(/^I PATCH to path "([^"]*)"$/, async function(endpoint){
    const patchResponse = await API.PATCH(endpoint)
    return patchResponse
});

Then(/^I DELETE from path "([^"]*)"$/, async function (endpoint){
    const deleteResponse = await API.DELETE(endpoint)
    return deleteResponse
});

Then(/^I assert that response status is "([^"]*)" and response text is "([^"]*)"$/, async function(expectedStatus, expectedText){
    assert.isNumber(apiResponseCode, expectedStatus);
    expect(apiResponseText).to.equal(expectedText);
})