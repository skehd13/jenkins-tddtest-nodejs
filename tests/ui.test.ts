// import request from "supertest";
// import { expect } from "chai";
// import React from "react";
// import ReactDom from "react-dom";
// import { act } from "react-dom/test-utils";
// import App from "../src/client/containers/app";
// import puppeteer, { Browser, Page } from "puppeteer";

// let browser: Browser, page: Page;

// describe("앱 컴포넌트 테스트", () => {
//   let loadURL = "http://0.0.0.0:5005";
//   before(async () => {
//     browser = await puppeteer.launch({ headless: true, timeout: 60 * 1000 });
//     page = await browser.newPage();
//   });

//   beforeEach(async () => {});

//   after(() => {
//     browser.close();
//   });

//   it("Hello world 테스트", async () => {
//     await page.goto("http://0.0.0.0:5005");
//     await page.waitForSelector("#root");

//     let title = await page.$("#app");
//     let content = await title?.$eval("#hello", element => element.innerHTML);
//     expect(content).to.equal("hello world");
//   });

//   it("로그인 실패", async () => {
//     const dialogDismissed = new Promise((resolve, reject) => {
//       const handler = async (dialog: puppeteer.Dialog) => {
//         console.log("message:", dialog.message());
//         await dialog.dismiss();
//         resolve(dialog.message());
//       };
//       page.once("dialog", handler);
//     });
//     await page.focus("#email");
//     await page.keyboard.type("test@test.com");
//     await page.focus("#password");
//     await page.keyboard.type("12345");
//     await page.click("#submitBt");
//     const msg = await dialogDismissed;
//     expect(msg).to.equal("정보확인");
//   });

//   it("로그인 테스트", async () => {
//     // await page.focus("#email");
//     // await page.keyboard.press("Backspace");
//     // await page.keyboard.type("test@test.com");
//     await page.focus("#password");
//     await page.keyboard.press("Backspace");
//     // await page.keyboard.type("1234");
//     await page.focus("#submitBt");
//     await page.click("#submitBt");

//     await page.waitForNavigation();
//     // const url = await page.url();
//     // console.log(url);
//     // expect(url).to.equal("http://0.0.0.0:5005/login");
//     // await page.waitForSelector("#login");
//     let login = await page.$("#login");
//     const loginState = await login?.$eval("#successLogin", el => el.innerHTML);
//     console.log(loginState);
//     expect(loginState).to.equal("로그인완료");
//   });
// });
