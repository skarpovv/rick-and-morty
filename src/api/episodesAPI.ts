import axios from "axios";

const instance = axios.create({
    baseURL: "https://rickandmortyapi.com/api/episode",
})

export const getMultipleEpisodes = (idArray: Array<string>) => {
    return instance.get('/'+idArray).then((res:any) => res.data);
}