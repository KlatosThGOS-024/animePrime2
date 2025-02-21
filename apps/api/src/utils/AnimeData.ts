import puppeteer, { Browser, Page } from "puppeteer";
export class RecentReleased {
  private browser: Browser | null = null;
  private page: Page | null = null;
  private baseUrl: string = "https://gogoanime.by/";
  constructor() {}

  private async launchBrowser(): Promise<void> {
    this.browser = await puppeteer.launch({ headless: false });
    this.page = await this.browser.newPage();
  }
  private async closeBrowser(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
    }
  }
  public async getNewAnimeData(): Promise<any[] | undefined> {
    if (!this.page) {
      await this.launchBrowser(); // ✅ Fix: Launch browser if not initialized
    }

    await this.page?.goto(this.baseUrl, {
      waitUntil: "load",
    });
    let animeList: any[] = [];

    while (true) {
      await this.page?.waitForSelector(".listupd article");

      // Scrape anime data
      const animeData = await this.page?.evaluate(() => {
        return Array.from(document.querySelectorAll(".listupd article")).map(
          (article) => {
            const title = article
              .querySelector("h2")
              ?.innerText.trim()
              .split("Episode")[0];

            const typez = (
              article.getElementsByClassName("typez")[0] as HTMLElement
            )?.innerText.trim();
            const subDub = (
              article.getElementsByClassName("Sub")[0] as HTMLElement
            )?.innerText.trim();
            const timeago = (
              article.getElementsByClassName("timeago")[0] as HTMLElement
            )?.innerText.trim();

            const image = article.querySelector("img")?.src;

            return { title, image, typez, subDub, timeago };
          }
        );
      });

      // Store the extracted anime data
      animeList = animeList.concat(animeData);
      console.log(animeList);
      // Check if "Next" button exists
      const nextButton = await this.page?.$(".hpage a.r");

      if (!nextButton) {
        console.log("No more pages. Scraping complete!");
        break; // Exit loop if "Next" button is not found
      }

      // Click on "Next" and wait for navigation
      await Promise.all([nextButton.click(), this.page?.waitForNavigation()]);
    }

    return animeList;
  }
}
const instance = new RecentReleased();
console.log(instance.getNewAnimeData());
