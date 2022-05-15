import {getCharacters} from "../../api/charactersAPI";

let SET_CHARACTERS = "SET_CHARACTERS";

type InitStateType = {
    test: string,
    charactersArray: Array<any>,
}

let initState: InitStateType = {
    test: "",
    charactersArray: [],
}

let CharacterReducer = (state:InitStateType = initState, action: any):InitStateType => {
    switch (action.type){
        case SET_CHARACTERS:{
            return {
                ...state,
                charactersArray: action.characters,
            }
        }
        default:
            return state;
    }
}

export const setCharacters = (characters:any):any => ({type: SET_CHARACTERS, characters});

export const getCharactersThunk = ():any => {
    return (dispatch: any) => {
        getCharacters().then((res:any) => {
            dispatch(setCharacters(res));
        });
    }
}


export default CharacterReducer;