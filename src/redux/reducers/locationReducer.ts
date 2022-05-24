import {Dispatch} from "redux";
import {getMultipleCharacters} from "../../api/charactersAPI";
import {CharacterType} from "./characterReducer";
import {getCharactersId} from "./episodeReducer";
import {getLocation, getLocations} from "../../api/locationsAPI";

type LocationType = {
    id: number,
    name: string,
    type: string,
    dimension: string,
    residents: Array<CharacterType>
    url?: string,
    created?: string,
};
type LocatonStateType = {
    location: LocationType,
    locationsArray: Array<LocationType>,
    pages: number,
    currentPage: number,
};

type SetLocationActionType = {
    type: typeof SET_LOCATION,
    location: LocationType,
}
type SetLocationCharactersActionType = {
    type: typeof SET_LOCATION_CHARACTERS,
    characters: Array<CharacterType>,
}
type SetPagesActionType = {
    type: typeof SET_LOCATIONS_PAGES,
    pages: number,
}
type SetCurrentPageActionType = {
    type: typeof SET_LOCATIONS_CURRENT_PAGE,
    currentPage: number,
}
type SetLocationsActionType = {
    type: typeof SET_LOCATIONS,
    locations: Array<LocationType>,
}

const SET_LOCATION = "SET_LOCATION";
const SET_LOCATION_CHARACTERS = "SET_LOCATION_CHARACTERS";
const SET_LOCATIONS_PAGES = "SET_LOCATIONS_PAGES";
const SET_LOCATIONS_CURRENT_PAGE = "SET_LOCATIONS_CURRENT_PAGE";
const SET_LOCATIONS = "SET_LOCATIONS";


let initState: LocatonStateType = {
    location: null,
    locationsArray: null,
    pages: null,
    currentPage: 1,
}

let LocationReducer = (state:LocatonStateType = initState, action: any):LocatonStateType => {
    switch (action.type){
        case SET_LOCATION:{
            return {...state, location: action.location};
        }
        case SET_LOCATION_CHARACTERS:{
            return {
                ...state,
                location: {...state.location, residents: (Array.isArray(action.characters)) ? action.characters : [action.characters]}
            }
        }
        case SET_LOCATIONS_PAGES:{
            return {...state, pages: action.pages}
        }
        case SET_LOCATIONS_CURRENT_PAGE:{
            return {...state, currentPage: action.currentPage}
        }
        case SET_LOCATIONS: {
            return {...state, locationsArray: action.locations}
        }
        default:
            return state;
    }
}

const setLocation = (location: LocationType):SetLocationActionType => ({type: SET_LOCATION, location});
const setLocationCharacters = (characters: Array<CharacterType>):SetLocationCharactersActionType => ({type: SET_LOCATION_CHARACTERS, characters});
const setPages = (pages: number):SetPagesActionType => ({type: SET_LOCATIONS_PAGES, pages});
const setCurrentPage = (currentPage: number):SetCurrentPageActionType => ({type: SET_LOCATIONS_CURRENT_PAGE, currentPage});
const setLocations = (locations:Array<LocationType>):SetLocationsActionType => ({type: SET_LOCATIONS, locations});



export const getLocationThunk = (id:string):any => {
    return (dispatch: Dispatch) => {
        dispatch(setLocation(null));
        getLocation(id).then((res:any) => {
            let idArray = getCharactersId(res.residents);
            res.residents = null;
            dispatch(setLocation(res));
            getMultipleCharacters(idArray).then((res:any) => {
                dispatch(setLocationCharacters(res));
            })
        })
    }
};

export const getLocationsThunk = (currentPage: number = 1):any => {
    return (dispatch: Dispatch) => {
        getLocations(currentPage).then((res:any) => {
            dispatch(setPages(res.info.pages));
            dispatch(setCurrentPage(currentPage));
            dispatch(setLocations(res.results));
        })
    }
}

export default LocationReducer;

