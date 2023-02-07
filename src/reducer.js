import { combineReducers } from "@reduxjs/toolkit";
import loadPokemonReducer from "./slices/loadPokemonSlice";
import searchReducer from "./slices/searchSlice";

const rootReducer = combineReducers({
    pokemonSearch: loadPokemonReducer,
    search: searchReducer 
})

export default rootReducer;