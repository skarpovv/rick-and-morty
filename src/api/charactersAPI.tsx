import axios from "axios";

const instance = axios.create({
    baseURL: "https://rickandmortyapi.com/api/character",
})

export const getCharacters = () => {
    return instance.get("").then((res:any) => res.data.results);
}
