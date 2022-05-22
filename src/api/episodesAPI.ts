import axios from "axios";

const instance = axios.create({
    baseURL: "https://rickandmortyapi.com/api/episode",
})

export const getMultipleEpisodes = (idArray: Array<string>) => {
    return instance.get('/'+idArray).then((res:any) => res.data);
}

export const getEpisode = (id: string) => {
    return instance.get('/'+id).then((res:any) => res.data);
}

export const getEpisodes = (page:number = 1) => {
    return instance.get("/?page=" + page).then((res:any) => res.data);
}
