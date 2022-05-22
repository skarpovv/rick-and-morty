import {Dispatch} from "redux";
import {getEpisode, getEpisodes} from "../../api/episodesAPI";
import {getMultipleCharacters} from "../../api/charactersAPI";
import {CharacterType} from "./characterReducer";

type EpisodeType = {
    id: number,
    name: string,
    air_date: string,
    episode: string,
    characters: Array<CharacterType>,
    url?: string,
    created?: string,
};
type EpisodesStateType = {
    episode: EpisodeType,
    episodesArray: Array<EpisodeType>,
    pages: number,
    currentPage: number,
};
type SetEpisodeActionType = {
    type: typeof SET_EPISODE,
    episode: EpisodeType,
}
type SetEpisodeCharactersActionType = {
    type: typeof SET_EPISODE_CHARACTERS,
    characters: Array<CharacterType>,
}
type SetPagesActionType = {
    type: typeof SET_EPISODES_PAGES,
    pages: number,
}
type SetCurrentPageActionType = {
    type: typeof SET_EPISODES_CURRENT_PAGE,
    currentPage: number,
}
type SetEpisodesActionType = {
    type: typeof SET_EPISODES,
    episodes: Array<EpisodeType>,
}

const SET_EPISODE = "SET_EPISODE";
const SET_EPISODE_CHARACTERS = "SET_EPISODE_CHARACTERS";
const SET_EPISODES_PAGES = "SET_EPISODES_PAGES";
const SET_EPISODES_CURRENT_PAGE = "SET_EPISODES_CURRENT_PAGE";
const SET_EPISODES = "SET_EPISODES";


let initState: EpisodesStateType = {
    episode: null,
    episodesArray: null,
    pages: null,
    currentPage: 1,
}

let EpisodeReducer = (state:EpisodesStateType = initState, action: any):EpisodesStateType => {
    switch (action.type){
        case SET_EPISODE:{
            return {...state, episode: action.episode};
        }
        case SET_EPISODE_CHARACTERS:{
            return {
                ...state,
                episode: {...state.episode, characters: action.characters}
            }
        }
        case SET_EPISODES_PAGES:{
            return {...state, pages: action.pages}
        }
        case SET_EPISODES_CURRENT_PAGE:{
            return {...state, currentPage: action.currentPage}
        }
        case SET_EPISODES: {
            return {...state, episodesArray: action.episodes}
        }
        default:
            return state;
    }
}

const setEpisode = (episode: EpisodeType):SetEpisodeActionType => ({type: SET_EPISODE, episode});
const setEpisodeCharacters = (characters: Array<CharacterType>):SetEpisodeCharactersActionType => ({type: SET_EPISODE_CHARACTERS, characters})
const setPages = (pages: number):SetPagesActionType => ({type: SET_EPISODES_PAGES, pages});
const setCurrentPage = (currentPage: number):SetCurrentPageActionType => ({type: SET_EPISODES_CURRENT_PAGE, currentPage});
const setEpisodes = (episodes:Array<EpisodeType>):SetEpisodesActionType => ({type: SET_EPISODES, episodes});

let getCharactersId = (urlArray: Array<string>):Array<string> => urlArray.map((el:string) => {
    return el.replace("https://rickandmortyapi.com/api/character/", "")
})

export const getEpisodeThunk = (id:string):any => {
    return (dispatch: Dispatch) => {
        dispatch(setEpisode(null));
        getEpisode(id).then((res:any) => {
            let idArray = getCharactersId(res.characters);
            res.characters = null;
            dispatch(setEpisode(res));
            getMultipleCharacters(idArray).then((res:any) => {
                dispatch(setEpisodeCharacters(res));
            })
        })
    }
};

export const getEpisodesThunk = (currentPage: number = 1):any => {
    return (dispatch: Dispatch) => {
        getEpisodes(currentPage).then((res:any) => {
            dispatch(setPages(res.info.pages));
            dispatch(setCurrentPage(currentPage));
            dispatch(setEpisodes(res.results));
        })
    }
}

export default EpisodeReducer;

