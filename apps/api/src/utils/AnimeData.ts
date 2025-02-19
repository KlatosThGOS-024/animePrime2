import puppeteer, { Browser, Page } from "puppeteer";
class RecentReleased {
  private browser: Browser | null = null;
  private page: Page | null = null;
  private baseUrl: string =
    "https://gogoanime.by/series/?page=1&genre%5B0%5D=sci-fi";
  constructor() {}

  private async launchBrowser(): Promise<void> {
    this.browser = await puppeteer.launch({ headless: true });
    this.page = await this.browser.newPage();
  }
  private async closeBrowser(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
    }
  }
  public async getNewAnimeData(): Promise<any[]> {
    if (!this.page) {
      throw new Error("Page is not initialized");
    }
    await this.page.goto(this.baseUrl, {
      waitUntil: "load",
    });
    const animeList = [];

    const animeData = await this.page.$$eval(
      ".listupd article",
      (articles) => {}
    );
  }
}
