import { configureStore } from "@reduxjs/toolkit";
import rootReducer  from "./reducer";
import loadPokemonReducer from "./slices/loadPokemonSlice"
import searchReducer from "./slices/searchSlice"

export const store = configureStore({ 
    reducer: rootReducer
});