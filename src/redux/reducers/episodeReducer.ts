import {Dispatch} from "redux";
import {getEpisode} from "../../api/episodesAPI";
import {getMultipleCharacters} from "../../api/charactersAPI";

type EpisodeType = {
    id: number,
    name: string,
    air_date: string,
    episode: string,
    characters: Array<any>,
    url?: string,
    created?: string,
};
type EpisodesStateType = {
    episode: EpisodeType;
};
type SetEpisodeActionType = {
    type: typeof SET_EPISODE,
    episode: EpisodeType,
}

const SET_EPISODE = "SET_EPISODE";

let initState: EpisodesStateType = {
    episode: null,
}

let EpisodeReducer = (state:EpisodesStateType = initState, action: any):EpisodesStateType => {
    switch (action.type){
        case SET_EPISODE:{
            return {...state, episode: action.episode};
        }
        default:
            return state;
    }
}

const setEpisode = (episode: EpisodeType):SetEpisodeActionType => ({type: SET_EPISODE, episode});

let getCharactersId = (urlArray: Array<string>):Array<string> => urlArray.map((el:string) => {
    return el.replace("https://rickandmortyapi.com/api/character/", "")
})
export const getEpisodeThunk = (id:string):any => {
    return (dispatch: Dispatch) => {
        getEpisode(id).then((res:any) => {
            let idArray = getCharactersId(res.characters);
            res.characters = null;
            dispatch(setEpisode(res));
            getMultipleCharacters(idArray).then((res:any) => {
                
            })
        })
    }
};

export default EpisodeReducer;

