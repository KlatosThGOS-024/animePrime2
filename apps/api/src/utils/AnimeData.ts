import puppeteer, { Browser, Page } from "puppeteer";

export class RecentReleased {
  private baseUrl: string =
    "https://gogoanime.by/solo-leveling-season-2-episode--english-subbed";

  constructor() {}

  async launchBrowser(): Promise<{ browser: Browser; page: Page }> {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    return { browser, page };
  }

  public async getAnimeInfo(
    EpisodeNumber: number
  ): Promise<string | undefined> {
    const { browser, page } = await this.launchBrowser();

    try {
      let episodeUrl = `https://gogoanime.by/solo-leveling-season-2-arise-from-the-shadow-episode-${EpisodeNumber}-english-subbed/`;

      console.log("Navigating to:", episodeUrl);

      await page.goto(episodeUrl, { waitUntil: "domcontentloaded" });

      const videoServerType = await page.waitForSelector(
        "div.servers > div > ul > li:nth-child(2)"
      );

      let foundUrl: string | undefined = undefined;

      if (videoServerType) {
        await videoServerType.click();

        page.on("response", async (response) => {
          const url = response.url();
          if (
            url.includes(
              "wp-content/plugins/video-player/includes/histream/play.php"
            )
          ) {
            console.log("Found URL:", url);
            foundUrl = url;
          }
        });

        await page.waitForFunction(
          () => {
            const foundUrl = [
              ...window.performance.getEntriesByType("resource"),
            ].some((entry) =>
              entry.name.includes(
                "wp-content/plugins/video-player/includes/histream/play.php"
              )
            );
            return foundUrl;
          },
          { timeout: 5000 }
        );

        console.log("URL found and function completed.");
      }

      return foundUrl;
    } catch (error) {
      console.error(`Error fetching episode ${EpisodeNumber}:`, error);
      return undefined;
    } finally {
      await browser.close();
    }
  }
}
