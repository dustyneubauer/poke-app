import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchTerm: ''
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state.search = (action.payload);
        }
    } 
})


export const selectSearchTerm = (state) => state.search.searchTerm;
console.log(selectSearchTerm);
export default searchSlice.reducer;
export const {setSearchTerm} = searchSlice.actions;