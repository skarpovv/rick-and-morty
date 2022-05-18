import {getCharacter, getCharacters, getCharactersFilter} from "../../api/charactersAPI";
import {Dispatch} from "redux";

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

let SET_CHARACTERS = "SET_CHARACTERS";
let SET_CHARACTER = "SET_CHARACTER";
let SET_PAGES = "SET_PAGES";
let SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

type InitStateType = {
    charactersArray: Array<CharacterType>,
    character: CharacterType,
    pages: number,
    currentPage: number,
}
type CharacterType = {
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
    episode: Array<string>,
    url: string,
    created?:string,
}

let initState: InitStateType = {
    charactersArray: [],
    character: null,
    pages: 0,
    currentPage: 1,
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
        default:
            return state;
    }
}

const setCharacters = (characters:Array<CharacterType>):SetCharactersActionType => ({type: SET_CHARACTERS, characters});
const setCharacter = (character: CharacterType):SetCharacterActionType => ({type: SET_CHARACTER,character});
const setPages = (pages: number):SetPagesActionType => ({type: SET_PAGES, pages});
const setCurrentPage = (page: number):SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, page});


export const getCharactersThunk = (page:number = 1):any => {
    return (dispatch: Dispatch) => {
        getCharacters(page).then((res) => {
            dispatch(setPages(res.info.pages));
            dispatch(setCurrentPage(page));
            dispatch(setCharacters(res.results));
        });
    }
}

export const getCharacterThunk = (id: string):any => {
    return (dispatch: Dispatch) => {
        dispatch(setCharacter(null));
        getCharacter(id).then((res:any) => {
            dispatch(setCharacter(res));
        })
    }
}

export const getCharactersFilterThunk = (filter: string):any => {
    return (dispatch: Dispatch) => {
        getCharactersFilter(filter).then((res:any) => {
            console.log(res.info.pages);
            dispatch(setPages(res.info.pages));
            dispatch(setCurrentPage(1));
            dispatch(setCharacters(res.results))
        })
    }
}


export default CharacterReducer;