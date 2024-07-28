const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://192.168.178.53/tar1090/');

    // Set the viewport size
    const width = 768;  // Desired width
    const height = 1024;  // Desired height
    await page.setViewport({ width, height });
    // Toggle the button
    await page.waitForSelector('#toggle_sidebar_button');
    await page.click('#toggle_sidebar_button');

    // Function to take a screenshot
    const takeScreenshot = async (count) => {
        await page.screenshot({ path: './screenshot.png' });
    };

    let count = 0;

    // Take an initial screenshot
    await takeScreenshot(count);

    // Take a screenshot every 10 seconds
    setInterval(async () => {
        count++;
        await takeScreenshot(count);
    }, 10000);
})();