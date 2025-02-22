import axios from "axios";

const getAnimeCard = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/v1/anime/animeCard/get"
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { getAnimeCard };
