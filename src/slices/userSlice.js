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
    'user/login', async ({username, password}) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "password": password,
            "username": username,
        });
        console.log(raw);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };

        return fetch("http://localhost:8000/api/login", requestOptions)
            .then(data => data.json())
    }
)

const initialState = {
    username: '',
    userID: '',
    token: '',
    isLoading: false,
    hasError: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state, action) => {
            console.log('logout')
        return {
            ...initialState
        }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadUserData.fulfilled, (state, action) => {
                state.username = action.payload.username;
                state.userID = action.payload.id;
                state.isLoading = false;
            })
            .addCase(loadUserData.pending, (state, action) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadUserData.rejected, (state, action) => {
                state.username = null;
                state.userID = null;
                state.hasError = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log(action.payload.userId);
                return {
                    ...state,
                    username: action.payload.username,
                    userId: action.payload.userId,
                    token: action.payload.token
                }
            })
            .addCase(login.rejected, (state, action) => {
                console.log(action)
                return {
                    ...state,
                    error: action.payload.error,
                    token: undefined,
                }
            })
    }
})

export const selectUsername = (state) => state.user.username;
export const userId = (state) => state.user.userId;
export const selectToken = (state) => state.user.token;

export const { logout } = userSlice.actions;
export default userSlice.reducer;