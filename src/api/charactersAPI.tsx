import axios from "axios";

const instance = axios.create({
    baseURL: "https://rickandmortyapi.com/api/character",
})

export const getCharacters = (page: number = 1) => {
    return instance.get(`/?page=${page}`).then((res:any) => res.data.results);
}
