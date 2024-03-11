import {expect, test} from "@playwright/test";

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:3000/');
})

const value = 'new todo';

test('Check todo list title',async ({page}) => {
    await expect(page).toHaveTitle(/Todo List/)
})

test('Added todo is visible', async ({page}) => {
    const input = await page.locator("input#addInput");
    await input.fill(value);

    const addButton = await page.locator("button#addButton");
    await addButton.click();

    const todoItem = await page.locator(`//span[text()='${value}']`)
    await expect(todoItem).toBeVisible();
})

test('Clear input after add todo',async ({page}) => {
    const input = await page.locator("input#addInput");
    await input.fill(value);

    const addButton = await page.locator("button#addButton");
    await addButton.click();

    await expect(input).toBeEmpty();
})

test('Complete todo work successful',async ({page}) => {
    const input = await page.locator("input#addInput");
    await input.fill(value);

    const addButton = await page.locator("button#addButton");
    await addButton.click();

    const todoItem = await page.locator(`//span[text()='${value}']`)

    await todoItem.click();

    await expect(todoItem).toHaveClass(/completed/)
})

test('Delete todo work successful', async ({page}) => {
    const input = await page.locator("input#addInput");
    await input.fill(value);

    const addButton = await page.locator("button#addButton");
    await addButton.click();

    const todoItem = await page.locator(`//span[text()='${value}']`)

    await expect(todoItem).toBeVisible();

    const deleteButton = await page.locator("span.deleteButton").last();

    await deleteButton.click();

    await expect(todoItem).not.toBeVisible();
})