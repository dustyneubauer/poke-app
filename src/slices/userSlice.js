import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadUserData = createAsyncThunk(
    'userData/loadUserData', async () => {
        const userData = await fetch(`http://localhost:8000/api/login`)
        const json = await userData.json;
        console.log(json);
        return json;
    }
)


export const userSlice = createSlice({
    name: 'userData',
    initialState: {
        userName: '',
        userID: '',
        isLoading: false,
        hasError: false,
    },
    extraReducers: (builder) => {
        builder
        .addCase (loadUserData.fulfilled, (state, action) => {
            state.userName = action.payload.username;
            state.userID = action.payload.id;
            state.isLoading = false;
        })
        .addCase(loadUserData.pending, (state, action)=>{
            state.isLoading= true;
            state.hasError= false;
        })
        .addCase(loadUserData.rejected, (state, action) =>{
            state.userName= null;
            state.userID= null;
            state.hasError= true;
        })
    }    
})

export const username = (state) => state.userData.userName;
export const userId = (state) => state.userData.userID;
export const {addUser } = userSlice.actions;
export default userSlice.reducer;