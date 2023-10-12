import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadRandomPokemon = createAsyncThunk(
    'pokeSearch/loadRandomPokemon', async(randomNumber) => {
        const pokemonData= await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`);
        const json = await pokemonData.json();
        return json;
    }
)

export const randomPokemonSlice = createSlice({
    name: 'randomPokemon',
    initialState:{
        pokemon: null,
        isLoading: false,
        hasError: false,
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadRandomPokemon.fulfilled, (state,action) => {
            state.pokemon = action.payload;
            state.isLoading = false;
        })
        .addCase(loadRandomPokemon.pending, (state,action)=>{
            state.isLoading= true;
            state.hasError= false;
        })
        .addCase(loadRandomPokemon.rejected, (state,action) =>{
            state.pokemon= [];
            state.hasError= true;
        })
    }
})

export const selectPokemon = (state) => state.randomPokemon.pokemon;
export const isLoading = (state) => state.randomPokemon.isLoading;
export default randomPokemonSlice.reducer;