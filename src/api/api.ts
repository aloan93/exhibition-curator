import axios from "axios";

const metMuseumAPI = axios.create({
  baseURL: "https://collectionapi.metmuseum.org/public/collection/v1",
});

const clevelandMuseumAPI = axios.create({
  baseURL: "https://openaccess-api.clevelandart.org/api",
});

export { metMuseumAPI, clevelandMuseumAPI };
