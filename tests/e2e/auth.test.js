const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('Authentification E2E', () => {
  let driver;
  const timeout = 15000;

  beforeAll(async () => {
    const options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--remote-allow-origins=*');
    options.addArguments('--disable-gpu');
    options.addArguments('--window-size=1920,1080');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
    
    await driver.get('http://localhost:3000/login');
  }, timeout);

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  test('Connexion avec succès', async () => {
    const emailInput = await driver.wait(until.elementLocated(By.id('email')), timeout);
    const passwordInput = await driver.findElement(By.id('password'));
    const loginButton = await driver.findElement(By.css('button[type="submit"]'));

    await emailInput.sendKeys('admin@test.com');
    await passwordInput.sendKeys('password');
    await loginButton.click();

    await driver.wait(until.urlContains('/dashboard'), timeout);
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toContain('/dashboard');

    const dashboardTitle = await driver.wait(until.elementLocated(By.xpath("//h1[contains(text(), 'Gestionnaire de Tâches')]")), timeout);
    expect(await dashboardTitle.isDisplayed()).toBe(true);
  }, timeout);

  test('Échec de connexion avec mauvais identifiants', async () => {
    await driver.get('http://localhost:3000/login');
    
    const emailInput = await driver.wait(until.elementLocated(By.id('email')), timeout);
    const passwordInput = await driver.findElement(By.id('password'));
    const loginButton = await driver.findElement(By.css('button[type="submit"]'));

    await emailInput.clear();
    await emailInput.sendKeys('wrong@test.com');
    await passwordInput.clear();
    await passwordInput.sendKeys('wrongpassword');
    await loginButton.click();

    const errorMessage = await driver.wait(until.elementLocated(By.className('error-message')), timeout);
    expect(await errorMessage.getText()).toContain('invalides');
  }, timeout);
});
