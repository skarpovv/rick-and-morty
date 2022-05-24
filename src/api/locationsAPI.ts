import axios from "axios";

const instance = axios.create({
    baseURL: "https://rickandmortyapi.com/api/location",
});

export const getLocation = (id: string) => {
    return instance.get("/"+id).then((res:any) => res.data);
}

export const getLocations = (page:number) => {
    return instance.get(`?page=${page}`).then((res:any) => res.data)
}