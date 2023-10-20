import { useDispatch, useSelector, } from "react-redux";
import React, {useState, useEffect} from "react";
import { deleteComment, commentData, saveComment, loadComment } from "../slices/commentsSlice";
import { v4 as uuid} from 'uuid';
import { userId} from "../slices/userSlice";
import '../index.css'

export const Comments = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const commentsArr = useSelector(commentData);
    const id = useSelector(userId);

    const comment = {
        id: uuid(),
        text: input
    }

  

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const handleDelete = (e) => {
        dispatch(deleteComment(e.target.value))
    }

    useEffect((e)=> {
        dispatch(loadComment(id));
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(saveComment(comment))
        setInput('');
    }

return (
    <>
    <div className="comments-input">
        <textarea onChange={handleChange} value={input} className="comment-form"></textarea>
        <div className="my-team-info">
        <button type="submit" value={comment} onClick={handleSubmit}>Submit Comment</button>
        </div>
    </div>
    {commentsArr && (
        <div className="comments-display">
            {commentsArr.map((element)=>{
                return (
                    <div  className="single-comment">
                        <p>{element.text}</p>
                        <button value={element.id} onClick={handleDelete}>Delete Comment</button>
                    </div>
                )
            })}
        </div>
    )}
</>
)

}