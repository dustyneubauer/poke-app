import { combineReducers } from "@reduxjs/toolkit";
import loadPokemonReducer from "./slices/loadPokemonSlice";
import searchReducer from "./slices/searchSlice";
import randomPokemonReducer from "./slices/randomPokeSlice";
import teamReducer from "./slices/teamSlice"
import commentsReducer from "./slices/commentsSlice";
import userReducer from "./slices/userSlice";

const rootReducer = combineReducers({
    pokemonSearch: loadPokemonReducer,
    search: searchReducer,
    randomPokemon: randomPokemonReducer,
    team: teamReducer,
    comments: commentsReducer,
    user: userReducer,
})

export default rootReducer;