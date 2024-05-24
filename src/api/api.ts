import axios from "axios";

const metMuseumAPI = axios.create({
  baseURL: "https://collectionapi.metmuseum.org/public/collection/v1",
});

export { metMuseumAPI };
