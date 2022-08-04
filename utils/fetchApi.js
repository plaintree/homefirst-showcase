import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";

const apiHeaders = {
  "X-RapidAPI-Key": "4e46caff70msh5513230aad3a98dp16e1dfjsn64318a994ae2",
  "X-RapidAPI-Host": "bayut.p.rapidapi.com",
};

export const fetchApi = async (url) => {
  const { data } = await axios.get(url, {
    headers: apiHeaders,
  });
  return data;
};
