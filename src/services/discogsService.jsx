import axios from "axios";

const baseUrl = "https://api.discogs.com/artists/4772215/releases";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const discogsService = { getAll };
export default discogsService;
