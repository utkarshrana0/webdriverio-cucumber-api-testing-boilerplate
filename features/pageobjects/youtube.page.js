const Page = require('./page');
const assert = require('chai').assert;
const expect = require('chai').expect;
/**
 * sub page containing specific selectors and methods for a specific page
 */
class youtubePage extends Page {
    /**
     * overwrite specific options to adapt it to page object
     */
    async open(url) {
        return await super.open(url);
    }

    /**
     * define selectors using getter methods
     */
     get acceptAllPopup(){
        return $(".//yt-formatted-string[text()='Accept all']")
    }

    get searchField(){
        return $(".//input[@id='search']");
    }

    get searchButton(){
        return $(".//button[@aria-label='Search']");
    }

    get youtubeWatchCard(){
        return $(".//ytd-universal-watch-card-renderer//a/ytd-channel-name//yt-formatted-string");
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async enterIntoSearchBar(text) {
        try{
            await this.acceptAllPopup.click();
            console.log("Popup dismissed!")
        }catch(e){
            console.log("No popup found!")
        }
        await this.searchField.setValue(text);
    }

    async clickSearchButton(){
        await this.searchButton.click();
    }

    async assertYoutubeWatchCard(text){
        const cardText = await this.youtubeWatchCard.getText();
        assert.strictEqual(cardText, text);
      }
}

module.exports = new youtubePage();