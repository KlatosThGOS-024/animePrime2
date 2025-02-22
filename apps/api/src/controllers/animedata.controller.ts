import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import fs from "fs";
import path from "path";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import prisma from "@repo/db";
import { animeType } from "@repo/common";
import { title } from "process";
const getAnimeFromJSON = () => {
  try {
    const filePath = path.resolve(__dirname, "../../../../Anime.json"); // Go up two levels to the project root
    let animeList = [];
    console.log(filePath);
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      animeList = fileContent ? JSON.parse(fileContent) : [];
    }

    return animeList;
  } catch (error) {
    console.log("Error reading Anime.json:", error);
  }
};

interface Anime {
  title: string;
  image: string;
  timeago: string;
  typez: string;
  subDub: string;
}
const animeData = [
  {
    title: "Shiye Mowang",
    image: "https://gogoanime.by/wp-content/uploads/2025/02/shiye-mowang.webp",
    typez: "Anime",
    subDub: "Sub",
    timeago: "12 minutes ago",
  },
  {
    title: "Beyblade X",
    image: "https://gogoanime.by/wp-content/uploads/2024/05/beyblade-x.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "14 minutes ago",
  },
  {
    title: "Rurouni Kenshin: Meiji Kenkaku Romantan – Kyoto Douran",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/rurouni-kenshin-meiji-kenkaku-romantan-kyoto-douran.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "20 hours ago",
  },
  {
    title: "Trillion Game",
    image:
      "https://i1.wp.com/gogoanime.by/wp-content/uploads/2024/10/TRILLION-GAME.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "20 hours ago",
  },
  {
    title: "Douse, Koishite Shimaunda.",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/douse-koishite-shimaunda.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "20 hours ago",
  },
  {
    title: "Sousei no Aquarion: Myth of Emotions",
    image:
      "https://i1.wp.com/gogoanime.by/wp-content/uploads/2025/01/Sousei-no-Aquarion-Myth-of-Emotions.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "20 hours ago",
  },
  {
    title: "BanG Dream! Ave Mujica",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/bang-dream-ave-mujica.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "21 hours ago",
  },
  {
    title: "Akuyaku Reijou Tensei Ojisan",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/akuyaku-reijou-tensei-ojisan.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "21 hours ago",
  },
  {
    title: "Momentary Lily",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/momentary-lily.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "21 hours ago",
  },
  {
    title: "Fuguushoku “Kanteishi” ga Jitsu wa Saikyou Datta",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/fuguushoku-kanteishi-ga-jitsu-wa-saikyou-datta.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "1 day ago",
  },
  {
    title: "Around 40 Otoko no Isekai Tsuuhan",
    image:
      "https://i3.wp.com/gogoanime.by/wp-content/uploads/2025/01/Around-40-Otoko-no-Isekai-Tsuuhan.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "24 hours ago",
  },
  {
    title: "Dr. Stone: Science Future",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/dr-stone-science-future.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "24 hours ago",
  },
  {
    title: "Yi Nian Yong Heng 3rd Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/02/yi-nian-yong-heng-3rd-season.webp",
    typez: "Anime",
    subDub: "Sub",
    timeago: "1 day ago",
  },
  {
    title: "Yoru wa Neko to Issho Season 3",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/12/yoru-wa-neko-to-issho-season-3.webp",
    typez: "Anime",
    subDub: "Sub",
    timeago: "1 day ago",
  },
  {
    title: "Ameku Takao no Suiri Karte",
    image:
      "https://i2.wp.com/gogoanime.by/wp-content/uploads/2025/01/Ameku-Takao-no-Suiri-Karte.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 days ago",
  },
  {
    title: "Magic Maker: Isekai Mahou no Tsukurikata",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/magic-maker-isekai-mahou-no-tsukurikata.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 days ago",
  },
  {
    title: "Honey Lemon Soda",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/honey-lemon-soda.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 days ago",
  },
  {
    title: "Izure Saikyou no Renkinjutsushi?",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/izure-saikyou-no-renkinjutsushi.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 days ago",
  },
  {
    title: "Re:Zero kara Hajimeru Isekai Seikatsu 3rd Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/rezero-kara-hajimeru-isekai-seikatsu-3rd-season.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 days ago",
  },
  {
    title: "Grisaia: Phantom Trigger",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/grisaia-phantom-trigger.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 days ago",
  },
  {
    title: "Ishura 2nd Season",
    image:
      "https://i0.wp.com/gogoanime.by/wp-content/uploads/2025/01/Ishura-2nd-Season.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 days ago",
  },
  {
    title: "Kusuriya no Hitorigoto 2nd Season",
    image:
      "https://i1.wp.com/gogoanime.by/wp-content/uploads/2025/01/Kusuriya-no-Hitorigoto-2nd-Season.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "7 days ago",
  },
  {
    title: "Hana wa Saku, Shura no Gotoku",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/hana-wa-saku-shura-no-gotoku.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "3 days ago",
  },
  {
    title:
      "Hazure Skill “Kinomi Master”: Skill no Mi (Tabetara Shinu) wo Mugen ni Taberareru You ni Natta Ken ni Tsuite",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/12/hazure-skill-kinomi-master-skill-no-mi-tabetara-shinu-wo-mugen-ni-taberareru-you-ni-natta-ken-ni-tsuite.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "3 days ago",
  },
  {
    title: "Unnamed Memory Act.2",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/unnamed-memory-act2.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "3 days ago",
  },
  {
    title: "Amagami-san Chi no Enmusubi",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/amagami-san-chi-no-enmusubi.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "3 days ago",
  },
  {
    title: "Youkai Gakkou no Sensei Hajimemashita!",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/youkai-gakkou-no-sensei-hajimemashita.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "3 days ago",
  },
  {
    title:
      "S-Rank Monster no “Behemoth” dakedo, Neko to Machigawarete Elf Musume no Pet toshite Kurashitemasu",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/12/s-rank-monster-no-behemoth-dakedo-neko-to-machigawarete-elf-musume-no-pet-toshite-kurashitemasu.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "6 days ago",
  },
  {
    title: "Himitsu no AiPri",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/himitsu-no-aipri.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "3 days ago",
  },
  {
    title: "0-saiji Start Dash Monogatari Season 2",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/0-saiji-Start-Dash-Monogatari-Season-2.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "3 days ago",
  },
  {
    title: "Touhai: Ura Rate Mahjong Touhai Roku",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/touhai-ura-rate-mahjong-touhai-roku.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "4 days ago",
  },
  {
    title: "Yami Shibai 14",
    image:
      "https://i2.wp.com/gogoanime.by/wp-content/uploads/2025/01/Yami-Shibai-14.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "4 days ago",
  },
  {
    title:
      "Botsuraku Yotei no Kizoku dakedo, Hima Datta kara Mahou wo Kiwametemita",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/botsuraku-yotei-no-kizoku-dakedo-hima-datta-kara-mahou-wo-kiwametemita.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "4 days ago",
  },
  {
    title: "Kuroiwa Medaka ni Watashi no Kawaii ga Tsuujinai",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/kuroiwa-medaka-ni-watashi-no-kawaii-ga-tsuujinai.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "4 days ago",
  },
  {
    title: "Arifureta Shokugyou de Sekai Saikyou Season 3",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/arifureta-shokugyou-de-sekai-saikyou-season-3.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "4 days ago",
  },
  {
    title: "Mahoutsukai no Yakusoku",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/mahoutsukai-no-yakusoku.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "4 days ago",
  },
  {
    title: "Kono Kaisha ni Suki na Hito ga Imasu",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/kono-kaisha-ni-suki-na-hito-ga-imasu.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "4 days ago",
  },
  {
    title: "Salaryman ga Isekai ni Ittara Shitennou ni Natta Hanashi",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/salaryman-ga-isekai-ni-ittara-shitennou-ni-natta-hanashi.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "4 days ago",
  },
  {
    title: "Mashin Souzouden Wataru",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/mashin-souzouden-wataru.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "4 days ago",
  },
  {
    title: "Yu Gi Oh!: Go Rush!!",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/yugioh-go-rush.webp",
    typez: "Drama",
    subDub: "Sub",
    timeago: "4 days ago",
  },
  {
    title: "Watashi no Shiawase na Kekkon 2nd Season",
    image:
      "https://i0.wp.com/gogoanime.by/wp-content/uploads/2025/01/Watashi-no-Shiawase-na-Kekkon-2nd-Season.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "4 days ago",
  },
  {
    title: "Ao no Hako",
    image: "https://gogoanime.by/wp-content/uploads/2024/10/ao-no-hako.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "4 days ago",
  },
  {
    title:
      "Shangri-La Frontier: Kusoge Hunter, Kamige ni Idoman to su 2nd Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/shangri-la-frontier-kusoge-hunter-kamige-ni-idoman-to-su-2nd-season.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 days ago",
  },
  {
    title: "Bleach: Sennen Kessen-hen – Soukoku-tan",
    image:
      "https://i0.wp.com/gogoanime.by/wp-content/uploads/2024/12/1733694855-8305-144074.jpg?resize=246,350",
    typez: "Anime",
    timeago: "2 months ago",
  },
  {
    title: "Dragon Ball Daima",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/dragon-ball-daima.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "7 days ago",
  },
  {
    title: "Sakamoto Days",
    image: "https://gogoanime.by/wp-content/uploads/2025/01/sakamoto-days.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "6 days ago",
  },
  {
    title: "Zenshuu.",
    image: "https://gogoanime.by/wp-content/uploads/2025/01/zenshuu.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 days ago",
  },
  {
    title: "Kinnikuman: Kanpeki Chоujin Shiso-hen Season 2",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/kinnikuman-kanpeki-chujin-shiso-hen-season-2.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 days ago",
  },
  {
    title: "Sentai Red Isekai de Boukensha ni Naru",
    image:
      "https://i1.wp.com/gogoanime.by/wp-content/uploads/2025/01/Sentai-Red-Isekai-de-Boukensha-ni-Naru.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 days ago",
  },
  {
    title: "Kisaki Kyouiku kara Nigetai Watashi",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/kisaki-kyouiku-kara-nigetai-watashi.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 days ago",
  },
  {
    title:
      "Kimi no Koto ga Daidaidaidaidaisuki na 100-nin no Kanojo 2nd Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/kimi-no-koto-ga-daidaidaidaidaisuki-na-100-nin-no-kanojo-2nd-season.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 days ago",
  },
  {
    title: "Jibaku Shounen Hanako-kun 2",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/jibaku-shounen-hanako-kun-2.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 days ago",
  },
  {
    title: "Mahoutsukai Precure!! Mirai Days",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/mahoutsukai-precure-mirai-days.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 days ago",
  },
  {
    title: "Punirunes 2",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/punirunes-puni-2.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 days ago",
  },
  {
    title: "Kimi to Idol Precure♪",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/02/kimi-to-idol-precure.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 days ago",
  },
  {
    title: "One Piece: Gyojin Tou-hen",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/11/one-piece-gyojin-tou-hen.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 days ago",
  },
  {
    title: "Cang Yuan Tu 2nd Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/02/cang-yuan-tu-2nd-season.webp",
    typez: "Anime",
    subDub: "Sub",
    timeago: "6 days ago",
  },
  {
    title:
      "S-Rank Monster no “Behemoth” dakedo, Neko to Machigawarete Elf Musume no Pet toshite Kurashitemasu [Uncensored]",
    image:
      "https://i2.wp.com/gogoanime.by/wp-content/uploads/2024/12/Beheneko-The-Elf-Girls-Cat-is-Secretly-an-S-Ranked-Monster-Uncensored.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "6 days ago",
  },
  {
    title: "Okinawa de Suki ni Natta Ko ga Hougen Sugite Tsurasugiru",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/okinawa-de-suki-ni-natta-ko-ga-hougen-sugite-tsurasugiru.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "6 days ago",
  },
  {
    title: "Medalist",
    image: "https://gogoanime.by/wp-content/uploads/2025/01/medalist.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "6 days ago",
  },
  {
    title: "UniteUp! Uni:Birth",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/uniteup-unibirth.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "6 days ago",
  },
  {
    title: "Ao no Exorcist: Yosuga-hen",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/ao-no-exorcist-yosuga-hen.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "6 days ago",
  },
  {
    title:
      "A-Rank Party wo Ridatsu shita Ore wa, Moto Oshiego-tachi to Meikyuu Shinbu wo Mezasu.",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/a-rank-party-wo-ridatsu-shita-ore-wa-moto-oshiego-tachi-to-meikyuu-shinbu-wo-mezasu.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "6 days ago",
  },
  {
    title: "NEET Kunoichi to Nazeka Dousei Hajimemashita",
    image:
      "https://i2.wp.com/gogoanime.by/wp-content/uploads/2025/01/Neet-Kunoichi-to-Nazeka-Dousei-Hajimemashita2.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "6 days ago",
  },
  {
    title: "Chi.: Chikyuu no Undou ni Tsuite",
    image:
      "https://i2.wp.com/gogoanime.by/wp-content/uploads/2024/10/Chikyuu-no-Undou-ni-Tsuite.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "6 days ago",
  },
  {
    title: "Ore dake Level Up na Ken Season 2: Arise from the Shadow",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/ore-dake-level-up-na-ken-season-2-arise-from-the-shadow.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "6 days ago",
  },
  {
    title: "Solo Leveling Season 2",
    image:
      "https://i1.wp.com/gogoanime.by/wp-content/uploads/2025/02/Solo-Leveling-Season-2-e1739559626425.jpeg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "6 days ago",
  },
  {
    title: "Babanbabanban Vampire",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/Babanbabanban-Vampire.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "6 days ago",
  },
  {
    title: "Pokemon (Shinsaku Anime)",
    image: "https://gogoanime.by/wp-content/uploads/2024/05/pokemon-2023.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "6 days ago",
  },
  {
    title: "Detective Conan",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/meitantei-conan.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "6 days ago",
  },
  {
    title: "Cardfight!! Vanguard: Divinez Deluxe-hen",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/cardfight-vanguard-divinez-deluxe-hen.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "6 days ago",
  },
  {
    title: "Ao no Miburo",
    image:
      "https://i1.wp.com/gogoanime.by/wp-content/uploads/2024/10/Ao-no-Miburo.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "6 days ago",
  },
  {
    title: "Ubel Blatt",
    image: "https://gogoanime.by/wp-content/uploads/2025/01/bel-blatt.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "7 days ago",
  },
  {
    title: "Sorairo Utility (TV)",
    image:
      "https://i3.wp.com/gogoanime.by/wp-content/uploads/2025/01/Sorairo-Utility-TV.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "7 days ago",
  },
  {
    title:
      "Guild no Uketsukejou desu ga, Zangyou wa Iya nanode Boss wo Solo Toubatsu Shiyou to Omoimasu",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/guild-no-uketsukejou-desu-ga-zangyou-wa-iya-nanode-boss-wo-solo-toubatsu-shiyou-to-omoimasu.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "7 days ago",
  },
  {
    title: "Farmagia",
    image: "https://gogoanime.by/wp-content/uploads/2025/01/farmagia.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "7 days ago",
  },
  {
    title: "Class no Daikirai na Joshi to Kekkon suru Koto ni Natta.",
    image:
      "https://i3.wp.com/gogoanime.by/wp-content/uploads/2025/01/Class-no-Daikirai-na-Joshi-to-Kekkon-suru-Koto-ni-Natta.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "7 days ago",
  },
  {
    title: "Tasokare Hotel",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/tasokare-hotel.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "7 days ago",
  },
  {
    title: "Nihon e Youkoso Elf-san.",
    image:
      "https://i1.wp.com/gogoanime.by/wp-content/uploads/2025/01/Nihon-e-Youkoso-Elf-san.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "7 days ago",
  },
  {
    title:
      "Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka V: Houjou no Megami-hen",
    image:
      "https://i0.wp.com/gogoanime.by/wp-content/uploads/2024/10/Dungeon-ni-Deai-wo-Motomeru-no-wa-Machigatteiru-Darou-ka.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 weeks ago",
  },
  {
    title: "Re:Zero kara Hajimeru Break Time 3rd Season",
    image:
      "https://i2.wp.com/gogoanime.by/wp-content/uploads/2024/10/Zero-kara-Hajimeru-Break-Time-3rd-Season.jpg?resize=246,350",
    typez: "",
    subDub: "Sub",
    timeago: "2 weeks ago",
  },
  {
    title: "Jintian de Wancan Jiushi Ni",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/02/jintian-de-wancan-jiushi-ni.webp",
    typez: "Anime",
    subDub: "Sub",
    timeago: "2 weeks ago",
  },
  {
    title: "Asatir 2: Mirai no Mukashi Banashi",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/12/asatir-2-mirai-no-mukashi-banashi.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "3 weeks ago",
  },
  {
    title: "Nanatsu no Taizai: Mokushiroku no Yonkishi 2nd Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/nanatsu-no-taizai-mokushiroku-no-yonkishi-2nd-season.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Shiguang Dailiren: Yingdu Pian",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/12/shiguang-dailiren-yingdu-pian.webp",
    typez: "Anime",
    subDub: "Sub",
    timeago: "3 weeks ago",
  },
  {
    title: "Sugar Bunnies Fleur",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/sugar-bunnies-fleur.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "3 weeks ago",
  },
  {
    title: "Wonderful Precure!",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/wonderful-precure.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "4 weeks ago",
  },
  {
    title: "Shinkalion: Change the World",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/shinkalion-change-the-world.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "4 weeks ago",
  },
  {
    title: "Dandadan",
    image:
      "https://i1.wp.com/gogoanime.by/wp-content/uploads/2024/10/Dandadan.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Dadao Chaotian",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/dadao-chaotian.webp",
    typez: "Anime",
    subDub: "Sub",
    timeago: "1 month ago",
  },
  {
    title: "Blue Lock vs. U-20 Japan",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/blue-lock-vs-u-20-japan.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Huo Feng Liao Yuan 2nd Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/huo-feng-liao-yuan-2nd-season.webp",
    typez: "Anime",
    subDub: "Sub",
    timeago: "1 month ago",
  },
  {
    title: "Doupo Cangqiong: Nian Fan",
    image:
      "https://i1.wp.com/gogoanime.by/wp-content/uploads/2025/01/Doupo-Cangqiong-Nian-Fan.jpg?resize=246,350",
    typez: "Anime",
    subDub: "Sub",
    timeago: "1 month ago",
  },
  {
    title: "Shaonian Ge Xing: Xue Ran Tianqi Pian",
    image:
      "https://gogoanime.by/wp-content/uploads/2025/01/shaonian-ge-xing-xue-ran-tianqi-pian.webp",
    typez: "Anime",
    subDub: "Sub",
    timeago: "1 month ago",
  },
  {
    title: "Ore dake Level Up na Ken",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/ore-dake-level-up-na-ken.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Fairy Tail: 100-nen Quest",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/fairy-tail-100-nen-quest.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Zhen Hun Jie 4th Season",
    image:
      "https://i1.wp.com/gogoanime.by/wp-content/uploads/2025/01/Zhen-Hun-Jie-4th-Season.jpg?resize=246,350",
    typez: "Anime",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Ooi! Tonbo 2nd Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/ooi-tonbo-2nd-season.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Hyakushou Kizoku 2nd Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/12/hyakushou-kizoku-2nd-season.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Hitoribocchi no Isekai Kouryaku",
    image:
      "https://i3.wp.com/gogoanime.by/wp-content/uploads/2024/09/Hitoribocchi-no-Isekai-Kouryaku.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Holy Knight",
    image: "https://gogoanime.by/wp-content/uploads/2024/05/holy-knight.webp",
    typez: "Anime",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Fate/strange Fake",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/12/fatestrange-fake.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Kamonohashi Ron no Kindan Suiri 2nd Season",
    image:
      "https://i3.wp.com/gogoanime.by/wp-content/uploads/2024/10/Kamonohashi-Ron-no-Kindan-Suiri-2nd-Season.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Kami no Tou: Koubou-sen",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/kami-no-tou-koubou-sen.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Sasayaku You ni Koi wo Utau",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/sasayaku-you-ni-koi-wo-utau.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Maou 2099",
    image: "https://gogoanime.by/wp-content/uploads/2024/10/maou-2099.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Shin Tennis no Oujisama: U-17 World Cup Semifinal",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/shin-tennis-no-oujisama-u-17-world-cup-semifinal.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Sengoku Youko: Senma Konton-hen",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/sengoku-youko-senma-konton-hen.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Yarinaoshi Reijou wa Ryuutei Heika wo Kouryakuchuu",
    image:
      "https://i0.wp.com/gogoanime.by/wp-content/uploads/2024/10/Yarinaoshi-Reijou-wa-Ryuutei-Heika-wo-Kouryakuchuu-1.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Tasuuketsu",
    image: "https://gogoanime.by/wp-content/uploads/2024/07/tasuuketsu.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Ranma ½ (2024)",
    image: "https://gogoanime.by/wp-content/uploads/2024/10/ranma-2024.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Rekishi ni Nokoru Akujo ni Naru zo",
    image:
      "https://i3.wp.com/gogoanime.by/wp-content/uploads/2024/10/Rekishi-ni-Nokoru-Akujo-ni-Naru-zo.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Seirei Gensouki 2",
    image:
      "https://i0.wp.com/gogoanime.by/wp-content/uploads/2024/10/Seirei-Gensouki-2.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Natsume Yuujinchou Shichi",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/natsume-yuujinchou-shichi.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Hoshifuru Oukoku no Nina",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/hoshifuru-oukoku-no-nina.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Raise wa Tanin ga Ii",
    image:
      "https://i1.wp.com/gogoanime.by/wp-content/uploads/2024/10/Yakuza-Fiance-Raise-wa-Tanin-ga-Ii.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Love Live! Superstar!! 3rd Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/love-live-superstar-3rd-season.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Puniru wa Kawaii Slime",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/puniru-wa-kawaii-slime.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "MF Ghost 2nd Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/mf-ghost-2nd-season.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Nageki no Bourei wa Intai shitai",
    image:
      "https://i3.wp.com/gogoanime.by/wp-content/uploads/2024/09/Let-This-Grieving-Soul-Retire.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Tensei Kizoku, Kantei Skill de Nariagaru 2nd Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/09/tensei-kizoku-kantei-skill-de-nariagaru-2nd-season.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Ao no Exorcist: Yuki no Hate-hen",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/ao-no-exorcist-yuki-no-hate-hen.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Kimi wa Meido-sama.",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/kimi-wa-meido-sama.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Party kara Tsuihou sareta Sono Chiyushi, Jitsu wa Saikyou ni Tsuki",
    image:
      "https://i1.wp.com/gogoanime.by/wp-content/uploads/2024/10/Party-kara-Tsuihou-sareta-Sono-Chiyushi-Jitsu-wa-Saikyou-ni-Tsuki.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Dandadan 2nd Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/12/dandadan-2nd-season.webp",
    typez: "TV Show",
    timeago: "2 months ago",
  },
  {
    title: "Mahoutsukai ni Narenakatta Onnanoko no Hanashi",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/mahoutsukai-ni-narenakatta-onnanoko-no-hanashi.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "The iDOLM@STER Shiny Colors 2nd Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/the-idolmster-shiny-colors-2nd-season.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Goukon ni Ittara Onna ga Inakatta Hanashi",
    image:
      "https://i2.wp.com/gogoanime.by/wp-content/uploads/2024/10/d.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Sword Art Online Alternative: Gun Gale Online II",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/sword-art-online-alternative-gun-gale-online-ii.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Kabushikigaisha Magi-Lumière",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/kabushikigaisha-magi-lumire.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Hamidashi Creative",
    image:
      "https://i1.wp.com/gogoanime.by/wp-content/uploads/2024/10/Hamidashi-Creative.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Sayounara Ryuusei, Konnichiwa Jinsei",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/sayounara-ryuusei-konnichiwa-jinsei.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Mecha-ude (TV)",
    image: "https://gogoanime.by/wp-content/uploads/2024/10/mecha-ude-tv.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Kekkon suru tte, Hontou desu ka",
    image:
      "https://i1.wp.com/gogoanime.by/wp-content/uploads/2024/10/Kekkon-suru-tte-Hontou-desu-ka.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Kinoko Inu",
    image: "https://gogoanime.by/wp-content/uploads/2024/10/kinoko-inu.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "NegaPosi Angler",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/negaposi-angler.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Kamierabi 2nd Season",
    image:
      "https://i0.wp.com/gogoanime.by/wp-content/uploads/2024/10/KamiErabi-GOD.app-Season-2.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Neko ni Tensei shita Ojisan",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/12/neko-ni-tensei-shita-ojisan.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title:
      "Saikyou no Shienshoku “Wajutsushi” de Aru Ore wa Sekai Saikyou Clan wo Shitagaeru",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/09/saikyou-no-shienshoku-wajutsushi-de-aru-ore-wa-sekai-saikyou-clan-wo-shitagaeru.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Chiikawa",
    image: "https://gogoanime.by/wp-content/uploads/2024/05/chiikawa.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "3 months ago",
  },
  {
    title: "Tsuma, Shougakusei ni Naru.",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/tsuma-shougakusei-ni-naru.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Maou-sama, Retry! R",
    image:
      "https://i0.wp.com/gogoanime.by/wp-content/uploads/2024/09/Maou-sama-Retry-R.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "2.5-jigen no Ririsa",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/25-jigen-no-ririsa.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "One Piece",
    image:
      "https://i2.wp.com/gogoanime.by/wp-content/uploads/2024/03/One-Piece-2.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Acro Trip",
    image: "https://gogoanime.by/wp-content/uploads/2024/10/acro-trip.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Shi Cao Lao Long Bei Guan Yi E Long Zhi Ming 2nd Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/shi-cao-lao-long-bei-guan-yi-e-long-zhi-ming-2nd-season.webp",
    typez: "Anime",
    subDub: "Sub",
    timeago: "2 months ago",
  },
  {
    title: "Wuliao Jiu Wanjie",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/wuliao-jiu-wanjie.webp",
    typez: "Anime",
    subDub: "Sub",
    timeago: "3 months ago",
  },
  {
    title: "Haigakura",
    image: "https://gogoanime.by/wp-content/uploads/2024/10/haigakura.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "3 months ago",
  },
  {
    title: "Girls & Panzer: Saishuushou Part 4 Specials",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/05/girls-panzer-saishuushou-part-4-specials.webp",
    typez: "Special",
    subDub: "Sub",
    timeago: "10 months ago",
  },
  {
    title: "Delico’s Nursery",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/08/delicos-nursery.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "3 months ago",
  },
  {
    title: "Houkago Shounen Hanako-kun Part 2",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/houkago-shounen-hanako-kun-part-2.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "3 months ago",
  },
  {
    title: "Punirunes",
    image: "https://gogoanime.by/wp-content/uploads/2024/11/punirunes.webp",
    typez: "TV Show",
    timeago: "3 months ago",
  },
  {
    title: "Murai no Koi",
    image:
      "https://i0.wp.com/gogoanime.by/wp-content/uploads/2024/10/Murai-no-Koi.jpg?resize=246,350",
    typez: "Anime",
    subDub: "Sub",
    timeago: "3 months ago",
  },
  {
    title: "Ya She",
    image: "https://gogoanime.by/wp-content/uploads/2024/10/ya-she.webp",
    typez: "Anime",
    subDub: "Sub",
    timeago: "3 months ago",
  },
  {
    title: "One Piece Fan Letter",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/one-piece-fan-letter.webp",
    typez: "Special",
    subDub: "Sub",
    timeago: "4 months ago",
  },
  {
    title: "Blue Lock:",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/11/blue-lock-episode-nagi-additional-time.webp",
    typez: "Drama",
    subDub: "Sub",
    timeago: "4 months ago",
  },
  {
    title: "Yeosin Gangnim",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/08/yeosin-gangnim.webp",
    typez: "Anime",
    subDub: "Sub",
    timeago: "4 months ago",
  },
  {
    title: "Uzumaki",
    image: "https://gogoanime.by/wp-content/uploads/2024/09/uzumaki.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "4 months ago",
  },
  {
    title: "Elf-san wa Yaserarenai.",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/elf-san-wa-yaserarenai.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Monogatari Series: Off Monster Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/monogatari-series-off-monster-season.webp",
    typez: "Anime",
    subDub: "Sub",
    timeago: "4 months ago",
  },
  {
    title: "Kankin Kuiki Level X",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/kankin-kuiki-level-x.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "4 months ago",
  },
  {
    title: "Boku no Hero Academia 7th Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/boku-no-hero-academia-7th-season.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "4 months ago",
  },
  {
    title: "Cardfight!! Vanguard: Divinez Season 2",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/cardfight-vanguard-divinez-season-2.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "4 months ago",
  },
  {
    title: "Ninjala",
    image: "https://gogoanime.by/wp-content/uploads/2024/03/ninjala-tv.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "4 months ago",
  },
  {
    title: "Yozakura-san Chi no Daisakusen",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/yozakura-san-chi-no-daisakusen.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Yami Shibai 13",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/yami-shibai-12.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "“Oshi no Ko” 2nd Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/06/oshi-no-ko-2nd-season.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Atri: My Dear Moments",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/atri-my-dear-moments.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Katasumi no Uroko",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/katasumi-no-uroko.webp",
    typez: "",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Uji ni wa Monogatari ga Aru",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/10/uji-ni-wa-monogatari-ga-aru.webp",
    typez: "Anime",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Kami no Tou: Ouji no Kikan",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/06/kami-no-tou-ouji-no-kikan.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "One Piece: Yuruganu Seigi! Kaigun no Hokoritakaki Log!",
    image:
      "https://i0.wp.com/gogoanime.by/wp-content/uploads/2024/09/One-Piece.jpeg?resize=246,350",
    typez: "Special",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Tsue to Tsurugi no Wistoria",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/tsue-to-tsurugi-no-wistoria.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "The Fable",
    image: "https://gogoanime.by/wp-content/uploads/2024/04/the-fable.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Make Heroine ga Oosugiru!",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/make-heroine-ga-oosugiru.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Nige Jouzu no Wakagimi",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/nige-jouzu-no-wakagimi.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Tensui no Sakuna-hime",
    image:
      "https://i0.wp.com/gogoanime.by/wp-content/uploads/2024/07/Tensui-no-Sakuna-hime.jpeg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Naze Boku no Sekai wo Daremo Oboeteinai no ka?",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/naze-boku-no-sekai-wo-daremo-oboeteinai-no-ka.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Shadowverse Flame: Arc-hen",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/shadowverse-flame-arc-hen.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Kono Sekai wa Fukanzen Sugiru",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/kono-sekai-wa-fukanzen-sugiru.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Dungeon no Naka no Hito",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/dungeon-no-naka-no-hito.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Grendizer U",
    image: "https://gogoanime.by/wp-content/uploads/2024/07/grendizer-u.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "NieR:Automata Ver1.1a Part 2",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/nierautomata-ver11a-part-2.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Tensei shitara Slime Datta Ken 3rd Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/tensei-shitara-slime-datta-ken-3rd-season.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Senpai wa Otokonoko",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/senpai-wa-otokonoko.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Dead Dead Demons Dededede Destruction (ONA)",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/05/dead-dead-demons-dededede-destruction-ona.webp",
    typez: "Anime",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title:
      "Hazurewaku no “Joutai Ijou Skill” de Saikyou ni Natta Ore ga Subete wo Juurin suru made",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/hazurewaku-no-joutai-ijou-skill-de-saikyou-ni-natta-ore-ga-subete-wo-juurin-suru-made.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Koi wa Futago de Warikirenai",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/koi-wa-futago-de-warikirenai.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Isekai Shikkaku",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/isekai-shikkaku.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Egumi Legacy",
    image: "https://gogoanime.by/wp-content/uploads/2024/07/egumi-legacy.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Katsute Mahou Shoujo to Aku wa Tekitai shiteita.",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/katsute-mahou-shoujo-to-aku-wa-tekitai-shiteita.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Ookami to Koushinryou: Merchant Meets the Wise Wolf",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/ookami-to-koushinryou-merchant-meets-the-wise-wolf.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title:
      "Shinmai Ossan Boukensha, Saikyou Party ni Shinu hodo Kitaerarete Muteki ni Naru.",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/shinmai-ossan-boukensha-saikyou-party-ni-shinu-hodo-kitaerarete-muteki-ni-naru.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Shy 2nd Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/shy-2nd-season.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Mayonaka Punch",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/mayonaka-punch.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Na Nare Hana Nare",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/na-nare-hana-nare.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Kinnikuman: Kanpeki Chоujin Shiso-hen",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/kinnikuman-kanpeki-chujin-shiso-hen.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "VTuber Nandaga Haishin Kiri Wasuretara Densetsu ni Natteta",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/vtuber-nandaga-haishin-kiri-wasuretara-densetsu-ni-natteta.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Karasu wa Aruji wo Erabanai",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/karasu-wa-aruji-wo-erabanai.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Madougushi Dahliya wa Utsumukanai",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/madougushi-dahliya-wa-utsumukanai.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Megami no Café Terrace 2nd Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/megami-no-caf-terrace-2nd-season.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Ramen Akaneko",
    image: "https://gogoanime.by/wp-content/uploads/2024/07/ramen-akaneko.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Giji Harem",
    image: "https://gogoanime.by/wp-content/uploads/2024/07/giji-harem.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Tasogare Out Focus",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/tasogare-out-focus.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title:
      "Ore wa Subete wo “Parry” suru: Gyaku Kanchigai no Sekai Saikyou wa Boukensha ni Naritai",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/ore-wa-subete-wo-parry-suru-gyaku-kanchigai-no-sekai-saikyou-wa-boukensha-ni-naritai.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Gimai Seikatsu",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/06/gimai-seikatsu.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Tokidoki Bosotto Russia-go de Dereru Tonari no Alya-san",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/06/tokidoki-bosotto-russia-go-de-dereru-tonari-no-alya-san.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Shikanoko Nokonoko Koshitantan",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/shikanoko-nokonoko-koshitantan.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Urusei Yatsura (2022) 2nd Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/urusei-yatsura-2022-2nd-season.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title:
      "Sokushi Cheat ga Saikyou sugite, Isekai no Yatsura ga Marude Aite ni Naranai n desu ga.",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/sokushi-cheat-ga-saikyou-sugite-isekai-no-yatsura-ga-marude-aite-ni-naranai-n-desu-ga.webp",
    typez: "Drama",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Isekai Yururi Kikou: Kosodateshinagara Boukensha Shimasu",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/isekai-yururi-kikou-kosodateshinagara-boukensha-shimasu.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Shoushimin Series",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/shoushimin-series.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Boku no Tsuma wa Kanjou ga Nai",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/06/boku-no-tsuma-wa-kanjou-ga-nai.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Mob kara Hajimaru Tansaku Eiyuutan",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/mob-kara-hajimaru-tansaku-eiyuutan.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Bye Bye, Earth",
    image: "https://gogoanime.by/wp-content/uploads/2024/07/bye-bye-earth.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Quanzhi Gaoshou 3",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/06/quanzhi-gaoshou-3.webp",
    typez: "Anime",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Maougun Saikyou no Majutsushi wa Ningen datta",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/06/maougun-saikyou-no-majutsushi-wa-ningen-datta.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "5 months ago",
  },
  {
    title: "Code Geass: Dakkan no Rozé",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/06/code-geass-dakkan-no-roz.webp",
    typez: "Anime",
    subDub: "Sub",
    timeago: "6 months ago",
  },
  {
    title:
      "Kimi to Boku no Saigo no Senjou, Aruiwa Sekai ga Hajimaru Seisen Season II",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/kimi-to-boku-no-saigo-no-senjou-aruiwa-sekai-ga-hajimaru-seisen-season-ii.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "6 months ago",
  },
  {
    title: "Touken Ranbu Kai: Kyoden Moyuru Honnouji",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/touken-ranbu-kai-kyoden-moyuru-honnouji.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "Bleach",
    image: "https://gogoanime.by/wp-content/uploads/2004/10/bleach.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "6 months ago",
  },
  {
    title: "Isekai Suicide Squad",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/isekai-suicide-squad.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "6 months ago",
  },
  {
    title: "Demon Slayer: Kimetsu no Yaiba",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/08/kimetsu-no-yaiba.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "6 months ago",
  },
  {
    title: "Tensei shitara Slime Datta Ken 3rd Season Specials",
    image:
      "https://i3.wp.com/gogoanime.by/wp-content/uploads/2024/08/That-Time-I-Got-Reincarnated-as-a-Slime-Season-03.jpg?resize=246,350",
    typez: "",
    subDub: "Sub",
    timeago: "6 months ago",
  },
  {
    title: "The Misfit of Demon King Academy II Part 2",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/maou-gakuin-no-futekigousha-ii-shijou-saikyou-no-maou-no-shiso-tensei-shite-shison-tachi-no-gakkou-e-kayou-part-2.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "7 months ago",
  },
  {
    title: "Sanguo Sha: Taiping Tianshu",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/sanguo-sha-taiping-tianshu.webp",
    typez: "Anime",
    subDub: "Sub",
    timeago: "7 months ago",
  },
  {
    title: "Shinkalion: Change the World – Ushinawareta Kioku",
    image:
      "https://i2.wp.com/gogoanime.by/wp-content/uploads/2024/07/Shinkalion.jpg?resize=246,350",
    typez: "Special",
    subDub: "Sub",
    timeago: "7 months ago",
  },
  {
    title: "Kimetsu no Yaiba Movie: Mugen Jou-hen",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/07/kimetsu-no-yaiba-movie-mugen-jou-hen.webp",
    typez: "",
    timeago: "8 months ago",
  },
  {
    title: "Sukuwareru Ramiris",
    image:
      "https://i0.wp.com/gogoanime.by/wp-content/uploads/2024/07/Sukuwareru-Ramiris.jpg?resize=246,350",
    typez: "Anime",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Boukyaku Battery (TV)",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/boukyaku-battery-tv.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Sentai Daishikkaku",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/sentai-daishikkaku.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Demon Slayer: Kimetsu no Yaiba Hashira Training Arc",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/05/kimetsu-no-yaiba-hashira-geiko-hen.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Mushoku Tensei II: Isekai Ittara Honki Dasu Part 2",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/mushoku-tensei-ii-isekai-ittara-honki-dasu-part-2.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Hibike! Euphonium 3",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/hibike-euphonium-3.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Captain Tsubasa Season 2: Junior Youth-hen",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/captain-tsubasa-season-2-junior-youth-hen.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Long Zu (Japanese Dub)",
    image: "https://gogoanime.by/wp-content/uploads/2024/05/long-zu.webp",
    typez: "Anime",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Tonari no Youkai-san",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/tonari-no-youkai-san.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "The New Gate",
    image: "https://gogoanime.by/wp-content/uploads/2024/04/the-new-gate.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Girls Band Cry",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/girls-band-cry.webp",
    typez: "",
    timeago: "11 months ago",
  },
  {
    title: "Kaijuu 8-gou",
    image: "https://gogoanime.by/wp-content/uploads/2024/04/kaijuu-8-gou.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Ooi! Tonbo",
    image: "https://gogoanime.by/wp-content/uploads/2024/04/ooi-tonbo.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Mahouka Koukou no Rettousei 3rd Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/mahouka-koukou-no-rettousei-3rd-season.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Kenka Dokugaku",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/kenka-dokugaku.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Wind Breaker",
    image: "https://gogoanime.by/wp-content/uploads/2024/04/wind-breaker.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Date A Live V",
    image: "https://gogoanime.by/wp-content/uploads/2024/04/date-a-live-v.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Kaii to Otome to Kamikakushi",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/kaii-to-otome-to-kamikakushi.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Seiyuu Radio no Uraomote",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/seiyuu-radio-no-uraomote.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Rinkai!",
    image: "https://gogoanime.by/wp-content/uploads/2024/04/rinkai.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Unnamed Memory",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/unnamed-memory.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Yuuki Bakuhatsu Bang Bravern",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/yuuki-bakuhatsu-bang-bravern.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "11 months ago",
  },
  {
    title: "Tadaima, Okaeri",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/tadaima-okaeri.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Tsuki ga Michibiku Isekai Douchuu 2nd Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/tsuki-ga-michibiku-isekai-douchuu-2nd-season.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Lv2 kara Cheat datta Motoyuusha Kouho no Mattari Isekai Life",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/lv2-kara-cheat-datta-motoyuusha-kouho-no-mattari-isekai-life.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Shuumatsu Train Doko e Iku",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/shuumatsu-train-doko-e-iku.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Kami wa Game ni Ueteiru",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/kami-wa-game-ni-ueteiru.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Blue Archive the Animation",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/blue-archive-the-animation.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Tensei Kizoku, Kantei Skill de Nariagaru",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/tensei-kizoku-kantei-skill-de-nariagaru.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Vampire Dormitory",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/vampire-dormitory.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Shinigami Bocchan to Kuro Maid 3rd Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/shinigami-bocchan-to-kuro-maid-3rd-season.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Yoru no Kurage wa Oyogenai",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/yoru-no-kurage-wa-oyogenai.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Kuroshitsuji: Kishuku Gakkou-hen",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/kuroshitsuji-kishuku-gakkou-hen.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Highspeed Etoile",
    image:
      "https://i1.wp.com/gogoanime.by/wp-content/uploads/2024/04/Highspeed-Etoile-Episode.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "The iDOLM@STER Shiny Colors",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/the-idolmster-shiny-colors.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Astro Note",
    image: "https://gogoanime.by/wp-content/uploads/2024/04/astro-note.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Nijiyon Animation 2",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/nijiyon-animation-2.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Hananoi-kun to Koi no Yamai",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/hananoi-kun-to-koi-no-yamai.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Henjin no Salad Bowl",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/henjin-no-salad-bowl.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Yuru Camp△ Season 3",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/yuru-camp-season-3.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Bartender: Kami no Glass",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/bartender-kami-no-glass.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Kono Subarashii Sekai ni Shukufuku wo! 3",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/kono-subarashii-sekai-ni-shukufuku-wo-3.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title:
      "Tensei shitara Dainana Ouji Datta node, Kimama ni Majutsu wo Kiwamemasu",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/tensei-shitara-dainana-ouji-datta-node-kimama-ni-majutsu-wo-kiwamemasu.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Re:Monster",
    image: "https://gogoanime.by/wp-content/uploads/2024/04/Re-Monster.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Jiisan Baasan Wakagaeru",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/jiisan-baasan-wakagaeru.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "One Room, Hiatari Futsuu, Tenshi-tsuki.",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/one-room-hiatari-futsuu-tenshi-tsuki.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Maou no Ore ga Dorei Elf wo Yome ni Shitanda ga, Dou Medereba Ii?",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/maou-no-ore-ga-dorei-elf-wo-yome-ni-shitanda-ga-dou-medereba-ii.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title: "Dungeon Meshi",
    image: "https://gogoanime.by/wp-content/uploads/2024/03/dungeon-meshi.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "8 months ago",
  },
  {
    title:
      "Dekisokonai to Yobareta Motoeiyuu wa Jikka kara Tsuihou sareta node Sukikatte ni Ikiru Koto ni Shita",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/dekisokonai-to-yobareta-motoeiyuu-wa-jikka-kara-tsuihou-sareta-node-sukikatte-ni-ikiru-koto-ni-shita.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "Saint Seiya: Knights of the Zodiac – Battle Sanctuary Part 2",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/saint-seiya-knights-of-the-zodiac-battle-sanctuary-part-2.webp",
    typez: "Anime",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "Wakfu Special",
    image:
      "https://i3.wp.com/gogoanime.by/wp-content/uploads/2024/04/Wakfu-Special.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "10 months ago",
  },
  {
    title: "Wakfu OVA",
    image:
      "https://i0.wp.com/gogoanime.by/wp-content/uploads/2024/04/wakfu-ova.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "10 months ago",
  },
  {
    title: "Yong Sheng: Qizhuang Shanhe",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/yong-sheng-qizhuang-shanhe.webp",
    typez: "",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "Fatal Fury: Legend of the Hungry Wolf",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/05/fatal-fury-legend-of-the-hungry-wolf.webp",
    typez: "Special",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "Fatal Fury: The Motion Picture",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/05/fatal-fury-the-motion-picture.webp",
    typez: "",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "Hui Ming: Fenghuo San Yue",
    image:
      "https://i2.wp.com/gogoanime.by/wp-content/uploads/2024/05/Hui-Ming-Fenghuo-San-Yue.jpg?resize=246,350",
    typez: "Anime",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "Yao Shen Ji 8th Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/yao-shen-ji-7th-season.webp",
    typez: "",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "Nyaaaanvy",
    image: "https://gogoanime.by/wp-content/uploads/2024/06/nyaaaanvy.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "Zhu Xian 2nd Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/zhu-xian-2nd-season.webp",
    typez: "",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "Sabaku no Kaizoku! Captain Kuppa",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/06/sabaku-no-kaizoku-captain-kuppa.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "Urban Master: I Am The Peak of Medicine And Martial Arts",
    image: "https://gogoanime.by/wp-content/uploads/2024/04/Urban-Master.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "Anhe Zhuan Part 2",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/anhe-zhuan-part-2.webp",
    typez: "Anime",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "Bakugan Battle Brawlers: Gundalian Invaders",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/bakugan-battle-brawlers-gundalian-invaders.webp",
    typez: "",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "San Xiuzhi Wang",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/san-xiuzhi-wang.webp",
    typez: "",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "Jueshi Zhan Hun",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/jueshi-zhan-hun.webp",
    typez: "",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "Xiehou ta de Shaonu Shidai",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/05/xiehou-ta-de-shaonu-shidai.webp",
    typez: "Anime",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "Bear Bear Bear Kuma Punch!! Daiundoukai-hen",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/05/bear-bear-bear-kuma-punch-daiundoukai-hen.webp",
    typez: "",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "Bear Bear Bear Kuma Punch!",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/05/bear-bear-bear-kuma-punch.webp",
    typez: "Anime",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "Garouden: The Way of the Lone Wolf",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/05/garouden-the-way-of-the-lone-wolf.webp",
    typez: "Anime",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "Jantama Kan!!",
    image: "https://gogoanime.by/wp-content/uploads/2024/04/jantama-kan.webp",
    typez: "",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "Jinwu Wei: Feng Qi Jingling",
    image:
      "https://i2.wp.com/gogoanime.by/wp-content/uploads/2024/05/kkking.jpg?resize=246,350",
    typez: "Anime",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "Tousouchuu: Great Mission",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/05/tousouchuu-great-mission.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "Fengyun Bian (Nirvana of Storm Rider)",
    image:
      "https://i0.wp.com/gogoanime.by/wp-content/uploads/2024/05/Fengyun-Bian.jpeg?resize=246,350",
    typez: "Anime",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "Honoo no Labyrinth",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/05/honoo-no-labyrinth.webp",
    typez: "Anime",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "You Shou Yan 3rd Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/05/you-shou-yan-3rd-season.webp",
    typez: "Anime",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title:
      "Kono Yo no Hate de Koi wo Utau Shoujo YU-NO: Mugen no Heiretsu Sekai",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/05/kono-yo-no-hate-de-koi-wo-utau-shoujo-yu-no-mugen-no-heiretsu-sekai.webp",
    typez: "",
    timeago: "9 months ago",
  },
  {
    title: "Harinezumi no Luchika",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/05/harinezumi-no-luchika.webp",
    typez: "",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "Anime Tenchou Movie",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/05/anime-tenchou-movie.webp",
    typez: "Special",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "Tondemo Senshi Muteking",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/05/tondemo-senshi-muteking.webp",
    typez: "",
    subDub: "Sub",
    timeago: "10 months ago",
  },
  {
    title: "Shin Hokuto no Ken",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/05/shin-hokuto-no-ken.webp",
    typez: "Drama",
    subDub: "Sub",
    timeago: "10 months ago",
  },
  {
    title: "Tian Guan Cifu Special",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/05/tian-guan-cifu-special.webp",
    typez: "",
    subDub: "Sub",
    timeago: "10 months ago",
  },
  {
    title: "Xiaobing Chuanqi",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/05/xiaobing-chuanqi.webp",
    typez: "",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "Eternity Memories",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/05/eternity-memories.webp",
    typez: "Special",
    subDub: "Sub",
    timeago: "10 months ago",
  },
  {
    title: "Boku no Oldies wa All Color",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/05/boku-no-oldies-wa-all-color.webp",
    typez: "",
    subDub: "Sub",
    timeago: "10 months ago",
  },
  {
    title: "Mahou no Princess Minky Momo vs. Mahou no Tenshi Creamy Mami",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/mahou-no-princess-minky-momo-vs-mahou-no-tenshi-creamy-mami.webp",
    typez: "Movie",
    subDub: "Sub",
    timeago: "10 months ago",
  },
  {
    title: "Paripi Koumei: Road to Summer Sonia",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/paripi-koumei-road-to-summer-sonia.webp",
    typez: "Movie",
    subDub: "Sub",
    timeago: "10 months ago",
  },
  {
    title: "Stratos 4 OVA",
    image: "https://gogoanime.by/wp-content/uploads/2024/04/stratos-4-ova.webp",
    typez: "",
    subDub: "Sub",
    timeago: "10 months ago",
  },
  {
    title:
      "Atashin’chi 3D Movie: Jounetsu no Chou Chounouryoku Haha Dai Bousou",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/atashinchi-3d-movie-jounetsu-no-chou-chounouryoku-haha-dai-bousou.webp",
    typez: "Movie",
    subDub: "Sub",
    timeago: "10 months ago",
  },
  {
    title: "Rakudai Majo: Fuuka to Yami no Majo",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/rakudai-majo-fuuka-to-yami-no-majo.webp",
    typez: "Movie",
    subDub: "Sub",
    timeago: "10 months ago",
  },
  {
    title: "Muu no Hakugei",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/muu-no-hakugei.webp",
    typez: "",
    subDub: "Sub",
    timeago: "10 months ago",
  },
  {
    title: "Mahou no Tenshi Creamy Mami: Zutto Kitto Motto",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/mahou-no-tenshi-creamy-mami-zutto-kitto-motto.webp",
    typez: "",
    subDub: "Sub",
    timeago: "10 months ago",
  },
  {
    title: "Kaze no Invitation",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/kaze-no-invitation.webp",
    typez: "",
    subDub: "Sub",
    timeago: "10 months ago",
  },
  {
    title: "Mahou no Yousei Persia: Escape!",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/mahou-no-yousei-persia-escape.webp",
    typez: "",
    subDub: "Sub",
    timeago: "10 months ago",
  },
  {
    title: "Gunma-chan Season 2",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/gunma-chan-season-2.webp",
    typez: "",
    subDub: "Sub",
    timeago: "10 months ago",
  },
  {
    title: "Fanpai Chushihua",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/fanpai-chushihua.webp",
    typez: "Anime",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "Grimm Kumikyoku",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/grimm-kumikyoku.webp",
    typez: "",
    subDub: "Sub",
    timeago: "10 months ago",
  },
  {
    title: "Junk Boy",
    image:
      "https://i1.wp.com/gogoanime.by/wp-content/uploads/2024/04/Junk-Boy.jpg?resize=246,350",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "10 months ago",
  },
  {
    title: "One Piece: Log of Rivalry! The Straw Hats and Cipher Pol",
    image:
      "https://i1.wp.com/gogoanime.by/wp-content/uploads/2024/04/One-Piece-Log-of-Rivalry.jpg?resize=246,350",
    typez: "Special",
    subDub: "Sub",
    timeago: "10 months ago",
  },
  {
    title: "Xuwu Bianjing",
    image: "https://gogoanime.by/wp-content/uploads/2024/04/xuwu-bianjing.webp",
    typez: "Anime",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "Kuramerukagari",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/kuramerukagari.webp",
    typez: "Movie",
    subDub: "Sub",
    timeago: "10 months ago",
  },
  {
    title: "Oomuro-ke: Dear Sisters",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/oomuro-ke-dear-sisters.webp",
    typez: "Movie",
    subDub: "Sub",
    timeago: "11 months ago",
  },
  {
    title: "Jian Wang 3: Xia Gan Yi Dan Shen Jianxin 3rd Season Part 2",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/jian-wang-3-xia-gan-yi-dan-shen-jianxin-3rd-season-part-2.webp",
    typez: "",
    subDub: "Sub",
    timeago: "11 months ago",
  },
  {
    title: "Shen Zhiyi Jiao",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/shen-zhiyi-jiao.webp",
    typez: "",
    subDub: "Sub",
    timeago: "9 months ago",
  },
  {
    title: "Long Zu",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/long-zu-episode-0.webp",
    typez: "",
    subDub: "Sub",
    timeago: "11 months ago",
  },
  {
    title: "Boku no Hero Academia: Memories",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/boku-no-hero-academia-memories.webp",
    typez: "",
    subDub: "Sub",
    timeago: "11 months ago",
  },
  {
    title: "Xiao Lu He Xiao Lan 5th Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/xiao-lu-he-xiao-lan-5th-season.webp",
    typez: "",
    subDub: "Sub",
    timeago: "11 months ago",
  },
  {
    title: "Yin Shizong Men Zhang Jiao",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/04/yin-shizong-men-zhang-jiao.webp",
    typez: "",
    subDub: "Sub",
    timeago: "11 months ago",
  },
  {
    title: "I Really Don’t Want To Become A Saint",
    image:
      "https://gogoanime.by/wp-content/themes/dramastream/assets/images/noimg165px.png",
    typez: "",
    subDub: "Sub",
    timeago: "11 months ago",
  },
  {
    title: "Ishura",
    image: "https://gogoanime.by/wp-content/uploads/2024/03/ishura.webp",
    typez: "Drama",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title:
      "Akuyaku Reijou Level 99: Watashi wa Ura-Boss desu ga Maou dewa Arimasen",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/akuyaku-reijou-level-99-watashi-wa-ura-boss-desu-ga-maou-dewa-arimasen.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Yami Shibai 12",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/yami-shibai-12.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Isekai de Mofumofu Nadenade suru Tame ni Ganbattemasu",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/isekai-de-mofumofu-nadenade-suru-tame-ni-ganbattemasu.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Shangri-La Frontier: Kusoge Hunter, Kamige ni Idoman to su",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/shangri-la-frontier-kusoge-hunter-kamige-ni-idoman-to-su.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Kingdom 5th Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/kingdom-5th-season.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title:
      "Saikyou Tank no Meikyuu Kouryaku: Tairyoku 9999 no Rare Skill-mochi Tank, Yuusha Party wo Tsuihou sareru",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/saikyou-tank-no-meikyuu-kouryaku-tairyoku-9999-no-rare-skill-mochi-tank-yuusha-party-wo-tsuihou-sareru.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Kusuriya no Hitorigoto",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/kusuriya-no-hitorigoto.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Boku no Kokoro no Yabai Yatsu Season 2",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/boku-no-kokoro-no-yabai-yatsu-season-2.webp",
    typez: "Drama",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Ao no Exorcist: Shimane Illuminati-hen",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/ao-no-exorcist-shimane-illuminati-hen.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Mashle 2nd Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/mashle-shinkakusha-kouho-senbatsu-shiken-hen.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Bucchigiri?!",
    image: "https://gogoanime.by/wp-content/uploads/2024/03/bucchigiri.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Ragna Crimson",
    image: "https://gogoanime.by/wp-content/uploads/2024/03/ragna-crimson.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Yubisaki to Renren",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/yubisaki-to-renren.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Kekkon Yubiwa Monogatari",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/kekkon-yubiwa-monogatari.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Jaku-Chara Tomozaki-kun 2nd Stage",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/jaku-chara-tomozaki-kun-2nd-stage.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e 3rd Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/youkoso-jitsuryoku-shijou-shugi-no-kyoushitsu-e-3rd-season.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Dosanko Gal wa Namara Menkoi",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/dosanko-gal-wa-namara-menkoi.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Himesama “Goumon” no Jikan desu",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/himesama-goumon-no-jikan-desu.webp",
    typez: "Drama",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Synduality: Noir Part 2",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/synduality-noir-part-2.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Oroka na Tenshi wa Akuma to Odoru",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/oroka-na-tenshi-wa-akuma-to-odoru.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "High Card Season 2",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/high-card-season-2.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Kyuujitsu no Warumono-san",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/kyuujitsu-no-warumono-san.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Hikari no Ou 2nd Season",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/hikari-no-ou-2nd-season.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Meiji Gekken: 1874",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/meiji-gekken-1874.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title:
      "Loop 7-kaime no Akuyaku Reijou wa, Moto Tekikoku de Jiyuu Kimama na Hanayome Seikatsu wo Mankitsu suru",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/loop-7-kaime-no-akuyaku-reijou-wa-moto-tekikoku-de-jiyuu-kimama-na-hanayome-seikatsu-wo-mankitsu-suru.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title:
      "Shin no Nakama ja Nai to Yuusha no Party wo Oidasareta node, Henkyou de Slow Life suru Koto ni Shimashita 2nd",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/shin-no-nakama-ja-nai-to-yuusha-no-party-wo-oidasareta-node-henkyou-de-slow-life-suru-koto-ni-shimashita-2nd.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Megumi no Daigo: Kyuukoku no Orange",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/megumi-no-daigo-kyuukoku-no-orange.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Cardfight!! Vanguard: Divinez",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/cardfight-vanguard-asia-circuit-hen.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Majo to Yajuu",
    image: "https://gogoanime.by/wp-content/uploads/2024/03/majo-to-yajuu.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Gekkan Mousou Kagaku",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/gekkan-mousou-kagaku.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Shaman King: Flowers",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/shaman-king-flowers.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "30-sai made Doutei dato Mahoutsukai ni Nareru Rashii",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/30-sai-made-doutei-dato-mahoutsukai-ni-nareru-rashii.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Metallic Rouge",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/metallic-rouge.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Sengoku Youko",
    image: "https://gogoanime.by/wp-content/uploads/2024/03/sengoku-youko.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Mahou Shoujo ni Akogarete",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/mahou-shoujo-ni-akogarete.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Gekai Elise",
    image: "https://gogoanime.by/wp-content/uploads/2024/03/gekai-elise.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Pon no Michi",
    image: "https://gogoanime.by/wp-content/uploads/2024/03/pon-no-michi.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Snack Basue",
    image: "https://gogoanime.by/wp-content/uploads/2024/03/snack-basue.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Undead Unluck",
    image: "https://gogoanime.by/wp-content/uploads/2024/03/undead-unluck.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Momochi-san Chi no Ayakashi Ouji",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/momochi-san-chi-no-ayakashi-ouji.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Chiyu Mahou no Machigatta Tsukaikata",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/chiyu-mahou-no-machigatta-tsukaikata.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Saijaku Tamer wa Gomi Hiroi no Tabi wo Hajimemashita",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/saijaku-tamer-wa-gomi-hiroi-no-tabi-wo-hajimemashita.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Sousou no Frieren",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/sousou-no-frieren.webp",
    typez: "Drama",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Nozomanu Fushi no Boukensha",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/nozomanu-fushi-no-boukensha.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Sasaki to Pii-chan",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/sasaki-to-pii-chan.webp",
    typez: "",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Appleseed (Movie)",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/appleseed-movie.webp",
    typez: "Movie",
    subDub: "Sub",
    timeago: "12 months ago",
  },
  {
    title: "Mato Seihei no Slave",
    image:
      "https://gogoanime.by/wp-content/uploads/2024/03/mato-seihei-no-slave.webp",
    typez: "TV Show",
    subDub: "Sub",
    timeago: "12 months ago",
  },
];
interface Anime {
  title: string;
  image: string;
  timeago: string;
  typez: string;
  subDub: string;
}

const saveAnimeCard = asyncHandler(async (req: Request, res: Response) => {
  try {
    const animeList: Anime[] = getAnimeFromJSON(); // Make sure this returns the correct structure

    await prisma.animeCard.createMany({
      data: animeList.map((anime) => ({
        title: anime.title || null,
        image: anime.image || null,
        timeago: anime.timeago || null,
        typez: anime.typez || null, // Defaults to empty string if undefined
        subDub: anime.subDub || null,
      })),
    });

    res.send(new ApiResponse(true, "Successfully saved anime data"));
  } catch (error: any) {
    res.send(new ApiError("Something went wrong", 400, error.message)); // Avoid using @ts-ignore
  }
});

export { saveAnimeCard };
