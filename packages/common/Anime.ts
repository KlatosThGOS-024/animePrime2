import zod from "zod";

const animeCard = zod.object({
  title: zod.string(),
  image: zod.string(),
  typez: zod.string(),
  subDub: zod.string(),
  timeago: zod.string(),
});
export { animeCard };
