const { Given, When, Then } = require('@wdio/cucumber-framework');
const youtubePage = require('../pageobjects/youtube.page');

Given(/^I open the website (.+)$/, async (url) => {
    await youtubePage.open(url);
});

When(/^I enter (.+) in YouTube Search bar$/, async (text) => {
    await youtubePage.enterIntoSearchBar(text);
});

When(/^I click on Search button$/, async () => {
    await youtubePage.clickSearchButton();
});

Then(/^I should see valid result for "(.+)"$/, async (text) => {
    await youtubePage.assertYoutubeWatchCard(text);
});
