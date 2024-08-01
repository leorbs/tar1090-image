const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // Set the viewport size
    const width = 768;  // Desired width
    const height = 1024;  // Desired height
    await page.setViewport({ width, height });

    await page.goto('http://192.168.178.53/tar1090/?nowebgl&hideSideBar&hideButtons&mapContrast=-0.1&mapDim=-0.1&outlineWidth=4&outlineColor=ffffff&monochromeMarkers=000000&scale=1.7');


    // Function to escape special characters in CSS selectors
    function escapeCssSelector(selector) {
        return selector.replace(/([ #;?%&,.+*~\':"!^$[\]()=>|/@])/g, '\\$1');
    }

    // Function to uncheck a checkbox based on the label text
    async function uncheckCheckbox(labelText) {
        // Find the label element by its text content
        const labelHandle = await page.evaluateHandle((text) => {
            const elements = document.querySelectorAll('label');
            for (let element of elements) {
                if (element.textContent.trim() === text) {
                    return element;
                }
            }
            return null;
        }, labelText);

        if (labelHandle) {
            // Get the 'for' attribute value from the label
            const checkboxId = await page.evaluate(label => label.htmlFor, labelHandle);

            // Escape the checkbox ID for use in a CSS selector
            const escapedCheckboxId = escapeCssSelector(checkboxId);
            const checkboxSelector = `#${escapedCheckboxId}`;

            // Uncheck the checkbox if it is checked
            const isChecked = await page.$eval(checkboxSelector, checkbox => checkbox.checked);
            if (isChecked) {
                await page.click(checkboxSelector);
            }
        } else {
            console.log(`Checkbox with the label '${labelText}' not found.`);
        }
    }

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