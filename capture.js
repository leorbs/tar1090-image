const puppeteer = require('puppeteer');

const tarUrl = 'http://192.168.178.53/tar1090/?nowebgl&hideSideBar&hideButtons&outlineWidth=3&outlineColor=ffffff&monochromeMarkers=000000&scale=1.7&mapContrast=-0.05&mapDim=-0.05';
const screenshotPath = './media/screenshot.png';
const width = 768;
const height = 1024;

const startBrowser = async () => {
  const browser = await puppeteer.launch({
//    args: [
//      '--disk-cache-dir=/dev/null',
//      '--disk-cache-size=1',
//      '--user-data-dir=/dev/null'
//    ]
  });
  const page = await browser.newPage();

  // Set the viewport size
  await page.setViewport({ width, height });

  // Disable caching
  await page.setCacheEnabled(false);

  // Function to navigate to the URL with retry mechanism
  const navigateToUrl = async (url, retries = 3) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        return;
      } catch (error) {
        if (attempt === retries) throw error;
        console.log(`Retrying navigation, attempt ${attempt}...`);
      }
    }
  };

  await navigateToUrl(tarUrl);

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
    await page.screenshot({ path: screenshotPath });
  };

  // Take an initial screenshot
  await takeScreenshot();

  // Take a screenshot every 10 seconds
  const screenshotInterval = setInterval(async () => {
    await takeScreenshot();
  }, 10000);

  // Function to stop the browser and clear interval
  const stopBrowser = async () => {
    clearInterval(screenshotInterval);
    await browser.close();
  };

  return { browser, stopBrowser };
};

// Function to restart the browser every 12 hours
const run = async () => {
  let { stopBrowser } = await startBrowser();

  setInterval(async () => {
    await stopBrowser();
    ({ stopBrowser } = await startBrowser());
  }, 12 * 60 * 60 * 1000); // 12 hours in milliseconds
};

run().catch(error => {
  console.error('An error occurred:', error);
});
