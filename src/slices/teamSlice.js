import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { json } from "react-router-dom";

export const saveTeam = createAsyncThunk(
    'team/saveTeam',
    async (userId, { getState }) => {
        const team = getState().team.team;
        console.log(team);
        const pokemonTeam = team.map(element => {
            return element.name;
        })
        console.log(pokemonTeam);
        var requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                team: pokemonTeam
            }),
        };

        let response = await fetch("http://localhost:8000/api/team", requestOptions)
        if (response.status === 201) {
            return { saved: true }
        }

        return {
            saved: false
        }
    })

export const loadTeam = createAsyncThunk(
    'team/load', async (userId) => {
        try {
        const response = await fetch(`http://localhost:8000/api/team/${userId}`)
        const team = await response.json();
        console.log(team);
        if (team) {
           const promise = team.pokemon.map(async pokeName => {
                    const lowerCasePokemon = pokeName.toLowerCase();
                    const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${lowerCasePokemon}`);
                    const json = await pokemonData.json();
                    console.log(json);
                    const singlePokemon = {
                        name: json.name,
                        moves: json.moves,
                        image: json.sprites.front_shiny,
                    }
                    console.log(singlePokemon)
                    return singlePokemon;
            })
            const result = await Promise.all(promise)
            console.log(result);
            return result
        }
        else {
            alert('No team found in database');
        }
        }
        catch(err){
            console.log(err);
        }
    }
)


export const teamSlice = createSlice({
    name: 'team',
    initialState: {
        team: [],
        count: 0,
    },
    reducers: {
        addToTeam: (state, action) => {
            const pokemon = {
                name: action.payload.name,
                moves: action.payload.moves,
                image: action.payload.sprites.front_default,
            }
            state.team.push(pokemon);
            state.count += 1;
            console.log(action.payload.name);
        },
        removeFromTeam: (state, action) => {
            state.team = state.team.filter((pokemon) => pokemon.name !== action.payload);
            console.log(action.payload)
            state.count -= 1;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveTeam.rejected, (state, action) => {
                return {
                    ...state,
                    error: true,
                    message: 'Failed to save team'
                }
            })
            .addCase(saveTeam.fulfilled, (state, action) => {
                return {
                    ...state,
                    error: false,
                    message: 'Saved!'
                }
            })
            .addCase(loadTeam.fulfilled, (state, action) => {
                console.log(action.payload);
                return {
                    ...state,
                    team: action.payload,
                }
            })
            .addCase(loadTeam.rejected, (state, action) => {
                return {
                    ...state,
                    error: true,
                    message: 'Failed to load team'
                }
            })

    }
})

export const teamData = (state) => state.team.team;
export const countData = (state) => state.team.count;
export const { addToTeam, removeFromTeam } = teamSlice.actions;
export default teamSlice.reducer;
