import { useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import { addComment, deleteComment, commentData } from "../slices/commentsSlice";
import { v4 as uuid} from 'uuid';
import '../index.css'

export const Comments = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const commentsArr = useSelector(commentData);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addComment(comment));
        setInput('');
    }

return (
    <>
    <div className="comments-input">
        <textarea onChange={handleChange} value={input} className="comment-form"></textarea>
        <button type="submit" value={comment} onClick={handleSubmit}>Submit Comment</button>
    </div>
    {commentsArr && (
        <div className="comments-display">
            {commentsArr.map((element)=>{
                return (
                    <div  className="single-comment">
                        <p>{element.text}</p>
                        <button value={element.id} onClick={handleDelete}>Delete Comment</button>
                        {console.log(element.id)}
                    </div>
                )
            })}
        </div>
    )}
</>
)

}