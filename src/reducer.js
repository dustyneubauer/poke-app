import { combineReducers } from "@reduxjs/toolkit";
import loadPokemonReducer from "./slices/loadPokemonSlice";
import searchReducer from "./slices/searchSlice";
import randomPokemonReducer from "./slices/randomPokeSlice";
import teamReducer from "./slices/teamSlice"

const rootReducer = combineReducers({
    pokemonSearch: loadPokemonReducer,
    search: searchReducer,
    randomPokemon: randomPokemonReducer,
    team: teamReducer,
})

export default rootReducer;