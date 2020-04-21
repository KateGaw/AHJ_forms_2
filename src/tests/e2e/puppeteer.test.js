import puppetteer from 'puppeteer';

jest.setTimeout(5000000);

describe('INN/OGRN form', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'https://kategaw.github.io/AHJ_forms_2/';
  beforeAll(async () => {
    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 100,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
  });

  test('all', async () => {
    await page.goto(baseUrl);

    // create new line
    const addBtn = await page.$('#createB');
    addBtn.click();

    await page.waitForSelector('#form', { visible: true });
    const inputName = await page.$('#name', { visible: true });
    await inputName.type('Nokia');
    const inputCost = await page.$('#cost', { visible: true });
    await inputCost.type('45000');
    await page.waitFor(5000);

    const btnSave = await page.$('#btnSave', { visible: true });
    btnSave.click();
    await page.waitFor(5000);

    await page.waitForSelector('[data-id=form]', { visible: false });
    await page.waitFor(5000);

    // edit line with cancel
    const editBtn = await page.$('.edit_0');
    editBtn.click();
    await page.waitFor(5000);

    await page.waitForSelector('[data-id=form]', { visible: true });
    await page.$eval('.nameInput', (e) => e.innerHTML);
    await page.$eval('.costInput', (e) => e.innerHTML);
    const cancelBtn = await page.$('#btnCancel');
    cancelBtn.click();
    await page.waitFor(5000);

    // edit new line with saving
    const editBtn2 = await page.$('.edit_3');
    editBtn2.click();
    await page.waitFor(5000);

    await page.waitForSelector('[data-id=form]', { visible: true });
    await page.$eval('.nameInput', (e) => e.innerHTML);
    await inputCost.type('0');
    const btnSave2 = await page.$('#btnSave', { visible: true });
    btnSave2.click();
    await page.waitFor(5000);

    // delete last line
    // const deleteBtn = await page.$('.delete_3');
    // deleteBtn.click();
    // await page.waitFor(5000);
  });
});
