import { createSlice } from "@reduxjs/toolkit";

export const teamSlice = createSlice({
    name: 'team',
    initialState: {
        team: [],
        count: 0,
    },
    reducers: {
        addToTeam: (state,action) => {
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
    }

})

export const teamData = (state) => state.team.team;
export const countData = (state) => state.team.count;
export const {addToTeam, removeFromTeam} = teamSlice.actions;
export default teamSlice.reducer;
