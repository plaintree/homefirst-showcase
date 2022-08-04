import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";

const apiHeaders = {
  "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
  "X-RapidAPI-Host": "bayut.p.rapidapi.com",
};

export const fetchApi = async (url) => {
  const { data } = await axios.get(url, {
    headers: apiHeaders,
  });
  return data;
};
