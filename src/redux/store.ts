import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "@redux-devtools/extension";
import CharacterReducer from "./reducers/characterReducer";
import thunk from "redux-thunk";
import EpisodeReducer from "./reducers/episodeReducer";


const Reducers = combineReducers({
    characters: CharacterReducer,
    episodes: EpisodeReducer,
});

const store = createStore(Reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;