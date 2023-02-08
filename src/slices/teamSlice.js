import { createSlice } from "@reduxjs/toolkit";

export const teamSlice = createSlice({
    name: addToTeam,
    initialState: {
        team: [],
        count: 0,
    },
    reducers: {
        addToTeam: (state,action) => {
            const pokemon = {
                name: action.payload.name,
                moves: action.payload.moves,
                image: action.payload.sprites.front_shiny
            }
            state.addToTeam.push(pokemon);
            state.count += 1;
        },
        removeFromTeam: (state, action) => {
            state.addToTeam = state.addToTeam.filter((pokemon) => pokemon.name !== action.payload.name);
            state.count -= 1;
        }
    }

})


export const teamData = (state) => state.addToTeam.team;
export const countData = (state) => state.addToTeam.count;
export const {addToTeam, removeFromTeam} = teamSlice.actions;
export default teamSlice.reducer;