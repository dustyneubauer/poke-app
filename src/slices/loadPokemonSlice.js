import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadPokemonData = createAsyncThunk(
    'pokemonSearch/loadPokemonData',
    async() => {
        const pokemonData= await fetch(`https://pokeapi.co/api/v2/`);
        const json = await pokemonData.json();
        console.log(json);
        return json.results;
    }
)

export const loadPokemonSlice = createSlice({
    name: 'pokemonSearch',
    initialState:{
        pokemon: [],
        isLoading: false,
        hasError: false,
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadPokemonData.fulfilled, (state,action) => {
            state.pokemon = action.payload;
            state.isLoading = false;
        })
        .addCase(loadPokemonData.pending, (state,action)=>{
            state.isLoading= true;
            state.hasError= false;
        })
        .addCase(loadPokemonData.rejected, (state,action) =>{
            state.pokemon= [];
            state.hasError= true;
        })
    }
})

export const selectPokemon = (state) => state.pokemonSearch.pokemon;
export const isLoading = (state) => state.pokemonSearch.isLoading;
export default loadPokemonSlice.reducer;