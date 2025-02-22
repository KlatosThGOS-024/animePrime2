import zod from "zod";

const animeCard = zod.object({
  title: zod.string(),
  image: zod.string(),
  typez: zod.string(),
  subDub: zod.string(),
  timeago: zod.string(),
});
interface AnimeCardInterface {
  title: string;
  image: string;
  timeago: string;
  typez: string;
  subDub: string;
}
export { animeCard, AnimeCardInterface };
