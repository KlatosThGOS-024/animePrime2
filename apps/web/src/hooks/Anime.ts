import axios from "axios";
const getAnimeCard = async (page: number) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/v1/anime/animeCard/get?page=${page}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching anime card:", error);
    return null;
  }
};

export { getAnimeCard };
