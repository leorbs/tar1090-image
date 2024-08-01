const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // Set the viewport size
    const width = 768;  // Desired width
    const height = 1024;  // Desired height
    await page.setViewport({ width, height });

    await page.goto('http://192.168.178.53/tar1090/?nowebgl&hideSideBar&hideButtons&mapContrast=-0.1&mapDim=-0.1&outlineWidth=4&outlineColor=ffffff&monochromeMarkers=000000&scale=1.7');


      // Function to uncheck a checkbox based on label text
      const uncheckCheckbox = async (labelText) => {
        await page.evaluate((text) => {
          const label = Array.from(document.querySelectorAll('label'))
            .find(label => label.textContent.trim() === text);
          if (label) {
            const checkbox = document.getElementById(label.htmlFor);
            if (checkbox && checkbox.checked) {
              checkbox.click();
            }
          }
        }, labelText);
      };

    await uncheckCheckbox('actual range outline');
    await uncheckCheckbox('DWD RADOLAN');

    // Function to take a screenshot
    const takeScreenshot = async () => {
        await page.screenshot({ path: '/opt/tar1090-image/screenshot.png' });
    };

    // Take an initial screenshot
    await takeScreenshot();

    // Take a screenshot every 10 seconds
    setInterval(async () => {
        await takeScreenshot();
    }, 10000);
})();