import {getCharacter, getCharacters} from "../../api/charactersAPI";
import {Dispatch} from "redux";

type SetCharactersType = {
    type: typeof SET_CHARACTERS,
    characters: Array<CharacterType>,
}
type SetCharacterType = {
    type: typeof SET_CHARACTER,
    character: CharacterType,
}

let SET_CHARACTERS = "SET_CHARACTERS";
let SET_CHARACTER = "SET_CHARACTER";

type InitStateType = {
    charactersArray: Array<CharacterType>,
    character: CharacterType,
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
    character: null
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
        default:
            return state;
    }
}

const setCharacters = (characters:Array<CharacterType>):SetCharactersType => ({type: SET_CHARACTERS, characters});
const setCharacter = (character: CharacterType):SetCharacterType => ({type: SET_CHARACTER,character});

export const getCharactersThunk = (page:number = 1):any => {
    return (dispatch: Dispatch) => {
        getCharacters(page).then((res) => {
            dispatch(setCharacters(res));
        });
    }
}

export const getCharacterThunk = (id: string):any => {
    return (dispatch: Dispatch) => {
        getCharacter(id).then((res:any) => {
            dispatch(setCharacter(res));
        })
    }
}


export default CharacterReducer;