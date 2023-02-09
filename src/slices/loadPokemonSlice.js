import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadPokemonData = createAsyncThunk(
    'pokemonSearch/loadPokemonData',
    async(pokemon) => {
        if (pokemon) {
            const lowerCasePokemon = pokemon.toLowerCase();
            const pokemonData= await fetch(`https://pokeapi.co/api/v2/pokemon/${lowerCasePokemon}`);
            const json = await pokemonData.json();
            return json;
        }
        const pokemonData= await fetch(`https://pokeapi.co/api/v2/pokemon`);
            const json = await pokemonData.json();
            console.log(json.results);
            return json;
        }
)

export const loadPokemonSlice = createSlice({
    name: 'pokemonSearch',
    initialState:{
        pokemon: null,
        isLoading: false,
        hasError: false,
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadPokemonData.fulfilled, (state, action) => {
            state.pokemon = action.payload;
            state.isLoading = false;
        })
        .addCase(loadPokemonData.pending, (state, action)=>{
            state.isLoading= true;
            state.hasError= false;
        })
        .addCase(loadPokemonData.rejected, (state, action) =>{
            state.pokemon= null;
            state.hasError= true;
        })
    }
})

export const selectPokemon = (state) => state.pokemonSearch.pokemon;
export const isLoading = (state) => state.pokemonSearch.isLoading;
export default loadPokemonSlice.reducer;