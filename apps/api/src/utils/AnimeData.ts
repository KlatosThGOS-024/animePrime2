// import puppeteer, { Browser, Page } from "puppeteer";

// export class RecentReleased {
//   private browser: Browser | null = null;
//   private page: Page | null = null;
//   private baseUrl: string =
//     "https://gogoanime.by/solo-leveling-season-2-episode--english-subbed";
//   constructor() {}

//   async launchBrowser(): Promise<void> {
//     this.browser = await puppeteer.launch({ headless: false });
//     this.page = await this.browser.newPage();
//   }

//   async closeBrowser(): Promise<void> {
//     if (this.browser) {
//       await this.browser.close();
//     }
//   }

//   public async getNewAnimeData(): Promise<any[] | undefined> {
//     if (!this.page) {
//       await this.launchBrowser(); // ✅ Fix: Launch browser if not initialized
//     }

//     await this.page?.goto(this.baseUrl, {
//       waitUntil: "domcontentloaded", // Use 'domcontentloaded' to ensure the DOM is loaded
//     });
//     let animeList: any[] = [];

//     while (true) {
//       await this.page?.waitForSelector(".listupd article"); // Ensure the articles are loaded

//       // Scrape anime data
//       const animeData = await this.page?.evaluate(() => {
//         return Array.from(document.querySelectorAll(".listupd article")).map(
//           (article) => {
//             const title = article
//               .querySelector("h2")
//               ?.innerText.trim()
//               .split("Episode")[0];

//             const typez = (
//               article.getElementsByClassName("typez")[0] as HTMLElement
//             )?.innerText.trim();
//             const subDub = (
//               article.getElementsByClassName("Sub")[0] as HTMLElement
//             )?.innerText.trim();
//             const timeago = (
//               article.getElementsByClassName("timeago")[0] as HTMLElement
//             )?.innerText.trim();

//             const image = article.querySelector("img")?.src;

//             return { title, image, typez, subDub, timeago };
//           }
//         );
//       });

//       // Store the extracted anime data
//       animeList = animeList.concat(animeData);
//       console.log(animeList);

//       // Check if "Next" button exists
//       const nextButton = await this.page?.$(".hpage a.r");

//       if (!nextButton) {
//         console.log("No more pages. Scraping complete!");
//         break; // Exit loop if "Next" button is not found
//       }

//       // Click on "Next" and wait for navigation
//       await Promise.all([nextButton.click(), this.page?.waitForNavigation()]);
//     }

//     return animeList;
//   }

//   public async getAnimeInfo(EpisodeNumber: number): Promise<any[] | undefined> {
//     if (!this.browser) {
//       await this.launchBrowser();
//     }

//     // Create the episode URL
//     const episodeUrl = `https://gogoanime.by/solo-leveling-season-2-arise-from-the-shadow-episode-${EpisodeNumber}-english-subbed/`;
//     console.log("Navigating to:", episodeUrl); // Log the URL

//     await this.page?.goto(episodeUrl, { waitUntil: "domcontentloaded" });

//     const videoServerType = await this.page?.waitForSelector(
//       "div.servers > div > ul > li:nth-child(2)"
//     );

//     if (videoServerType) {
//       await videoServerType.click();

//       this.page?.on("response", async (response) => {
//         const url = response.url();
//         if (
//           url.includes(
//             "wp-content/plugins/video-player/includes/histream/play.php"
//           )
//         ) {
//           console.log("Found URL:", url);
//         }
//       });

//       await this.page?.waitForFunction(
//         () => {
//           const foundUrl = [
//             ...window.performance.getEntriesByType("resource"),
//           ].some((entry) =>
//             entry.name.includes(
//               "wp-content/plugins/video-player/includes/histream/play.php"
//             )
//           );
//           return foundUrl;
//         },
//         { timeout: 5000 }
//       );

//       console.log("URL found and function completed.");
//       return; // You may return the actual URL or other data if needed
//     }
//   }
// }

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
    // Launch a new browser and page for this episode
    const { browser, page } = await this.launchBrowser();

    try {
      // Construct episode URL
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
      // Close the browser after the episode is processed
      await browser.close();
    }
  }
}
