"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecentReleased = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
class RecentReleased {
    constructor() {
        this.browser = null;
        this.page = null;
        this.baseUrl = "https://gogoanime.by/";
    }
    launchBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            this.browser = yield puppeteer_1.default.launch({ headless: false });
            this.page = yield this.browser.newPage();
        });
    }
    closeBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.browser) {
                yield this.browser.close();
            }
        });
    }
    getNewAnimeData() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            if (!this.page) {
                yield this.launchBrowser(); // ✅ Fix: Launch browser if not initialized
            }
            yield ((_a = this.page) === null || _a === void 0 ? void 0 : _a.goto(this.baseUrl, {
                waitUntil: "load",
            }));
            let animeList = [];
            while (true) {
                yield ((_b = this.page) === null || _b === void 0 ? void 0 : _b.waitForSelector(".listupd article"));
                // Scrape anime data
                const animeData = yield ((_c = this.page) === null || _c === void 0 ? void 0 : _c.evaluate(() => {
                    return Array.from(document.querySelectorAll(".listupd article")).map((article) => {
                        var _a, _b, _c, _d, _e;
                        const title = (_a = article
                            .querySelector("h2")) === null || _a === void 0 ? void 0 : _a.innerText.trim().split("Episode")[0];
                        const typez = (_b = article.getElementsByClassName("typez")[0]) === null || _b === void 0 ? void 0 : _b.innerText.trim();
                        const subDub = (_c = article.getElementsByClassName("Sub")[0]) === null || _c === void 0 ? void 0 : _c.innerText.trim();
                        const timeago = (_d = article.getElementsByClassName("timeago")[0]) === null || _d === void 0 ? void 0 : _d.innerText.trim();
                        const image = (_e = article.querySelector("img")) === null || _e === void 0 ? void 0 : _e.src;
                        return { title, image, typez, subDub, timeago };
                    });
                }));
                // Store the extracted anime data
                animeList = animeList.concat(animeData);
                console.log(animeList);
                // Check if "Next" button exists
                const nextButton = yield ((_d = this.page) === null || _d === void 0 ? void 0 : _d.$(".hpage a.r"));
                if (!nextButton) {
                    console.log("No more pages. Scraping complete!");
                    break; // Exit loop if "Next" button is not found
                }
                // Click on "Next" and wait for navigation
                yield Promise.all([nextButton.click(), (_e = this.page) === null || _e === void 0 ? void 0 : _e.waitForNavigation()]);
            }
            return animeList;
        });
    }
}
exports.RecentReleased = RecentReleased;
const instance = new RecentReleased();
console.log(instance.getNewAnimeData());
