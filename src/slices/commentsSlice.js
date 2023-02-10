import { createSlice } from "@reduxjs/toolkit";

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
})

export const commentData = (state) => state.comments.comments;
export const {addComment, deleteComment} = commentsSlice.actions;
export default commentsSlice.reducer;