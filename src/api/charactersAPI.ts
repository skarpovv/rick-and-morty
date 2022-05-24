import axios from "axios";

const instance = axios.create({
    baseURL: "https://rickandmortyapi.com/api/character",
})

export const getCharacters = (page: number = 1, filter: string = "") => {
    return instance.get((!filter) ? `/?page=${page}` : `/?page=${page}&name=${filter}`).then((res:any) => res.data);
}

export const getCharacter = (id: string) => {
    return instance.get(`/${id}`).then((res:any)=> res.data);
}

export const getMultipleCharacters = (arrayId: Array<string>) => {
    if (arrayId.length === 0) return new Promise((resolve) => {resolve([])});
    return instance.get('/'+arrayId).then((res:any)=>res.data);
}

