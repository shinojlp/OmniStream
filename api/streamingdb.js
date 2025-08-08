import axios from "axios";

rapidapikey = "key";
const getstreamingendpoint = `https://streaming-availability.p.rapidapi.com/get?rapidapi-key=${rapidapikey}`;

const movieEndpoint = (id) => `${getstreamingendpoint}&tmdb_id=movie%2F${id}`;
const tvEndpoint = (id) => `${getstreamingendpoint}&tmdb_id=tv%2F${id}`;

async function getShowDetails(type, id) {
  const url = `https://streaming-availability.p.rapidapi.com/shows/${type}/${id}`;

  const options = {
    headers: {
      'X-Rapidapi-Key': rapidapikey,
      'X-Rapidapi-Host': 'streaming-availability.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.get(url, options);
    console.log("new getapi", response)
    return response.data;
  } catch (error) {
    console.error('API Error:', error.message);
    return null;
  }
}

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

export const fetchmovie = (movieId) => {
  return getShowDetails("movie", movieId)
};
export const fetchtv = (tvId) => {
  return getShowDetails("show", tvId)
};
