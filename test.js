const { Builder, By, Key, until } = require('selenium-webdriver');

async function testRegistrationAndLogin() {
    // Initialize Chrome WebDriver
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Open your local page
        await driver.get('http://localhost:8080');

        // Wait for registration form to load
        await driver.wait(until.elementLocated(By.id('regUsername')), 5000);

        // Fill in the registration form
        await driver.findElement(By.id('regUsername')).sendKeys('student1');
        await driver.findElement(By.id('regEmail')).sendKeys('student1@example.com');
        await driver.findElement(By.id('regPassword')).sendKeys('password123');
        await driver.findElement(By.id('regName')).sendKeys('Student One');

        // Select an event type
        const eventSelect = await driver.findElement(By.id('event'));
        await eventSelect.sendKeys('Workshop');

        // Click the Register button
        await driver.findElement(By.css('input[type="submit"]')).click();

        // Wait for the login form to appear
        await driver.wait(until.elementLocated(By.id('loginUsername')), 5000);

        // Fill in login credentials
        await driver.findElement(By.id('loginUsername')).sendKeys('student1');
        await driver.findElement(By.id('loginPassword')).sendKeys('password123');

        // Click the login button
        await driver.findElement(By.css('#loginForm input[type="submit"]')).click();

        // Wait for the message to appear after login
        const messageElement = await driver.wait(until.elementLocated(By.id('message')), 5000);
        const message = await messageElement.getText();

        console.log('Test Result:', message);

        if (message.includes('Login successful')) {
            console.log('Test Passed ✅');
        } else {
            console.log('Test Failed ❌');
        }

    } finally {
        await driver.quit();
    }
}

// Run the test
testRegistrationAndLogin();
