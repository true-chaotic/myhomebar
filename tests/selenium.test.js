const {Builder, By} = require('selenium-webdriver');

//const chrome = require('selenium-webdriver/chrome');
//chrome.binary_location = '/c/Program Files/BraveSoftware/Brave-Browser/Application/brave';
let driver;

beforeAll(async () => {
  driver = await new Builder()
    .forBrowser('chrome')
    //.setChromeOptions(chrome)
    .build();
});

afterAll(async () => {
    await driver.quit()
});

test('makes a google search', async () => {
    await driver.get('http://localhost:1234/');

    const title = await driver.getTitle();
    expect(title).toBe('My Home Bar')

    /*await driver.manage().setTimeouts({implicit: 1000})

    let searchBox = await driver.findElement(By.name('q'));
    let searchButton = await driver.findElement(By.name('btnK'));

    await searchBox.sendKeys('GSS Studio');

    let value = await searchBox.getAttribute("value");
    expect(value).toBe('GSS Studio');
    await searchButton.click();*/
}, 10000);