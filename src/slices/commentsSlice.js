import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const saveComment = createAsyncThunk(
    'comments/saveComment',
    async (userId, { getState }) => {
        const comment = getState().comments.comments;
        console.log(comment);
        const commentOnly = comment.map((indyComment)=> {
            return indyComment.text;
        })
        const commentId = comment.map((indyId)=>{
            return indyId.id;
        })
        var requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                comment: commentOnly,
                commentId: commentId
            }),
        };

        let response = await fetch("http://localhost:8000/api/comments", requestOptions)
        if (response.status === 201) {
            return { saved: true }
        }

        return {
            saved: false
        }
    })

export const loadComment = createAsyncThunk(
    'comments/load', async (userId) => {
        const comments = await fetch(`http://localhost:8000/api/comments/${userId}`)
        console.log(comments);
        if (comments) {
            const json = await comments.json();
            console.log(json);
            return json;
        }
        else {
            alert('No comments found in database');
        }
    }
)

export const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        comments: []
    },
    reducers: {
        addComment: (state,action) => {
            const comment = {
                text: action.payload.text,
                id: action.payload.id,
            }
            state.comments.push(comment)
        },
        deleteComment: (state,action) => {
            state.comments = state.comments.filter((comment) => comment.id !== action.payload);
            console.log(action.payload);
        },
    }, 
     extraReducers: (builder) => {
        builder
        .addCase(loadComment.fulfilled, (state,action) => {
            console.log(action.payload);
            state.comments = action.payload;
            state.isLoading = false;
        })
        .addCase(loadComment.pending, (state,action)=>{
            state.isLoading= true;
            state.hasError= false;
        })
        .addCase(loadComment.rejected, (state,action) =>{
            state.comments= [];
            state.hasError= true;
        })
    }
})


export const commentData = (state) => state.comments.comments;
export const {addComment, deleteComment} = commentsSlice.actions;
export default commentsSlice.reducer;