/**
 * perma-extension
 * @module tests/components/ArchiveForm.spec
 * @author The Harvard Library Innovation Lab
 * @license MIT
 * @description Browser-based tests for `<archive-form>`.
 */
import { expect } from "@playwright/test";
import { test, WAIT_MS_AFTER_BOOT } from "../index.js";

import { MESSAGE_IDS } from "../../src/constants/index.js";

// Refresh extension page and wait `WAIT_MS_AFTER_BOOT` ms before each test.
// This page contains an instance of `<archive-form>`.
test.beforeEach(async ({ page, extensionId }, testInfo) => {
  await page.goto(`chrome-extension://${extensionId}/popup/index.html`);
  await page.waitForTimeout(WAIT_MS_AFTER_BOOT);
});
 
test("Enforces the singleton pattern", async ({ page, extensionId }) => {
  // Try to inject a second `<archive-form>` in the document. 
  const count = await page.evaluate(() => {
    const extra = document.createElement("archive-form");
    document.querySelector("body").appendChild(extra);
 
    return document.querySelectorAll("archive-form").length;
  });
 
  expect(count).toBe(1); // Only the first one should remain.
});

test('Sign-in form shows up when `is-authenticated` is "false"',  async ({ page, extensionId }) => {
});

test('Sign-in form sends `AUTH_SIGN_IN` runtime message on submit.',  async ({ page, extensionId }) => {
});

test("Sign-in form has a working link to Perma.cc's bookmarklet feature.",  async ({ page, extensionId }) => {
});

test('Archive creation form sends `ARCHIVE_CREATE_PUBLIC` runtime message on submit.',  async ({ page, extensionId }) => {
});

test('Archive creation renders `folders-list`.',  async ({ page, extensionId }) => {
});

test('Archive creation takes into account `folder-pick`.',  async ({ page, extensionId }) => {
});

test('Archive creation form sends `FOLDERS_PICK_ONE` runtime message on folder `<select>` change.',  async ({ page, extensionId }) => {
});

test('Inputs are disabled when `is-loading` is "true"',  async ({ page, extensionId }) => {
});
