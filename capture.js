const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // Set the viewport size
    const width = 768;  // Desired width
    const height = 1024;  // Desired height
    await page.setViewport({ width, height });

    await page.goto('http://192.168.178.53/tar1090/?nowebgl&hideSideBar&hideButtons');

    // Function to take a screenshot
    const takeScreenshot = async (count) => {
        await page.screenshot({ path: './screenshot.png' });
    };

    // Take an initial screenshot
    await takeScreenshot(count);

    // Take a screenshot every 10 seconds
    setInterval(async () => {
        await takeScreenshot(count);
    }, 10000);
})();