import { createSlice } from "@reduxjs/toolkit";
import { userToken } from './userSlice';

export const saveTeam = createAsyncThunk(
    // team = ['pikachu', 'bulbasaur']
    'team/saveTeam', async (_, { getState }) => {
        console.log('DISPATCHING ACTION!!!!')

        var requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${userToken}` // token from user slice
            },
            body: JSON.stringify({
                team: getState().team
            }),
        };

        const response = await fetch("http://localhost:8000/api/team", requestOptions)
        if (response.status === 201) {
            return { saved: true }
        }

        return { 
            saved: false
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
        
    }
})

export const teamData = (state) => state.team.team;
export const countData = (state) => state.team.count;
export const {addToTeam, removeFromTeam} = teamSlice.actions;
export default teamSlice.reducer;
