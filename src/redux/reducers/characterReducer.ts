import {getCharacter, getCharacters} from "../../api/charactersAPI";
import {Dispatch} from "redux";
import {getMultipleEpisodes} from "../../api/episodesAPI";

type SetCharactersActionType = {
    type: typeof SET_CHARACTERS,
    characters: Array<CharacterType>,
}
type SetCharacterActionType = {
    type: typeof SET_CHARACTER,
    character: CharacterType,
}
type SetPagesActionType = {
    type: typeof SET_PAGES,
    pages: number,
}
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE,
    page: number,
}
type OnTextChangeActionType = {
    type: typeof ON_TEXT_CHANGE,
    text: string,
}
type SetCharacterEpisodesActionType = {
    type: typeof SET_CHARACTER_EPISODES,
    episodes: Array<any>,
}

const SET_CHARACTER_EPISODES = "SET_CHARACTER_EPISODES";
let SET_CHARACTERS = "SET_CHARACTERS";
let SET_CHARACTER = "SET_CHARACTER";
let SET_PAGES = "SET_PAGES";
let SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
let ON_TEXT_CHANGE = "ON_TEXT_CHANGE";

type InitStateType = {
    charactersArray: Array<CharacterType>,
    character: CharacterType,
    pages: number,
    currentPage: number,
    inputValue: string,
}
export type CharacterType = {
    id: number,
    name: string,
    status: string,
    species: string,
    gender: string,
    origin: {
        name: string,
        url: string,
    },
    location: {
        "name": string,
        "url": string,
    },
    image: string,
    episode: Array<any>,
    url: string,
    created?:string,
}

let initState: InitStateType = {
    charactersArray: [],
    character: null,
    pages: 0,
    currentPage: 1,
    inputValue: "",
}

let CharacterReducer = (state:InitStateType = initState, action: any):InitStateType => {
    switch (action.type){
        case SET_CHARACTERS:{
            return {
                ...state,
                charactersArray: action.characters,
            }
        }
        case SET_CHARACTER:{
            return {...state, character: action.character}
        }
        case SET_PAGES:{
            return {...state, pages: action.pages}
        }
        case SET_CURRENT_PAGE:{
            return {...state, currentPage: action.page};
        }
        case ON_TEXT_CHANGE:{
            return {...state, inputValue: action.text}
        }
        case SET_CHARACTER_EPISODES:{
            return {
                ...state,
                character: {...state.character, episode: (Array.isArray(action.episodes)) ? action.episodes : [action.episodes]}
            }
        }
        default:
            return state;
    }
}

const setCharacters = (characters:Array<CharacterType>):SetCharactersActionType => ({type: SET_CHARACTERS, characters});
const setCharacter = (character: CharacterType):SetCharacterActionType => ({type: SET_CHARACTER,character});
const setPages = (pages: number):SetPagesActionType => ({type: SET_PAGES, pages});
const setCurrentPage = (page: number):SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, page});
export const onTextChange = (text: string):OnTextChangeActionType => ({type: ON_TEXT_CHANGE, text});
const setCharacterEpisodesAction = (episodes: Array<any>): SetCharacterEpisodesActionType => ({type: SET_CHARACTER_EPISODES, episodes});


export const getCharactersThunk = (page:number = 1, filter:string = ""):any => {
    return (dispatch: Dispatch) => {
        getCharacters(page,filter).then((res) => {
            dispatch(setPages(res.info.pages));
            dispatch(setCurrentPage(page));
            dispatch(setCharacters(res.results));
        }).catch((rej:any) => {
            dispatch(setPages(0));
            dispatch(setCharacters([]));
        })
    }
}

let getEpisodeId = (urlArray: Array<string>):Array<string> => urlArray.map((el:string) => {
    return el.replace("https://rickandmortyapi.com/api/episode/", "")
})

export const getCharacterThunk = (id: string):any => {
    return (dispatch: Dispatch) => {
        dispatch(setCharacter(null));
        getCharacter(id).then((res:any) => {
            let idArray = getEpisodeId(res.episode);
            res.episode = [];
            dispatch(setCharacter(res));
            getMultipleEpisodes(idArray).then((res:any) => {
                dispatch(setCharacterEpisodesAction(res));
            })
        })
    }
}


export default CharacterReducer;
