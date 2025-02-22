import axios from "axios";
const getAnimeCard = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:8000/api/v1/anime/animeCard/get"
    );
    return data;
  } catch (error) {
    console.error("Error fetching anime card:", error);
    return null;
  }
};

export { getAnimeCard };
