import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "@redux-devtools/extension";
import CharacterReducer from "./reducers/characterReducer";
import thunk from "redux-thunk";
import EpisodeReducer from "./reducers/episodeReducer";
import LocationReducer from "./reducers/locationReducer";


const Reducers = combineReducers({
    characters: CharacterReducer,
    episodes: EpisodeReducer,
    locations: LocationReducer,
});

const store = createStore(Reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;