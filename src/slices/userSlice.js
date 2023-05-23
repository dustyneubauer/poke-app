import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadUserData = createAsyncThunk(
    'user/loadUserData', async () => {
        const userData = await fetch(`http://localhost:8000/api/login`)
        const json = await userData.json;
        console.log(json);
        return json;
    }
)

export const login = createAsyncThunk(
    'user/login', async (username, password) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        console.log('DISPATCHING ACTION!!!!')

        var raw = JSON.stringify({
            "password": password,
            "username": username,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };

        return fetch("http://localhost:8000/api/login", requestOptions)
            .then(data => data.json())
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userName: '',
        userID: '',
        token: '',
        isLoading: false,
        hasError: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadUserData.fulfilled, (state, action) => {
                state.userName = action.payload.username;
                state.userID = action.payload.id;
                state.isLoading = false;
            })
            .addCase(loadUserData.pending, (state, action) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadUserData.rejected, (state, action) => {
                state.userName = null;
                state.userID = null;
                state.hasError = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log(action)
                return {
                    ...state,
                    userName: action.payload.userName,
                    userId: action.payload.userID,
                    token: action.payload.token
                }
            })
            .addCase(login.rejected, (state, action) => {
                console.log(action)
                return {
                    ...state,
                    error: action.payload.error
                }
            })
    }
})

export const username = (state) => state.user.userName;
export const userId = (state) => state.user.userID;
export const authToken = (state) => state.user.token;

// export const { addUser } = userSlice.actions;
export default userSlice.reducer;