import axios from "axios";

const instance = axios.create({
    baseURL: "https://rickandmortyapi.com/api/character",
})

export const getCharacters = (page: number = 1) => {
    return instance.get(`/?page=${page}`).then((res:any) => res.data);
}

export const getCharacter = (id: string) => {
    return instance.get(`/${id}`).then((res:any)=> res.data);
}

export const getCharactersFilter = (filter: string) => {
    return instance.get(`/?name=${filter}`).then((res:any) => res.data);
}
