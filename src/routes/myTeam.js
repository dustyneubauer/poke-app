import { teamData, removeFromTeam, saveTeam, loadTeam } from "../slices/teamSlice";
import { useSelector, useDispatch } from "react-redux";
import React, {useState} from "react";
import { Comments } from "../components/comments";
import { selectUsername, userId} from "../slices/userSlice";

export const MyTeam = () => {
    const myTeam = useSelector(teamData)
    const dispatch = useDispatch();
    const user = useSelector(selectUsername);
    const id = useSelector(userId)

const [imageSrc, setImageSrc] = useState("");

const handleRemoveFromTeam = (e) => {
    dispatch(removeFromTeam(e.target.value))
}

const handleSaveTeam = () => {
    dispatch(saveTeam(id));
}

const handleLoadTeam = () => {
    dispatch(loadTeam(id));
}

const handleHover = (e) => {
    setImageSrc(e.target.value);
}

    if (!myTeam) {
        return (
            <div>
                <h1>My Team</h1>
                <h3>Visit the random pokemon page or the homepage to add pokemon to your team.</h3>
            </div>
        )
    }
    return (
        <>
    <div className="my-team-page">
       <div className="my-team-info">
       <h1>{user}'s Team</h1>
       <br></br>
       <button type="submit" onClick={handleSaveTeam}>Save Team</button>
       <button type="submit" onClick={handleLoadTeam}>Load Team</button>
        <ul>
        {myTeam.map((pokemon)=>{
            return(
            <li key={pokemon.name}>
            <div className="my-team-pokemon-container">
               <table>
                   <tbody>
                <tr>
                    <th><button onMouseOver={handleHover} value={pokemon.image}>{pokemon.name.toUpperCase()}</button></th>
                <td className="remove-button"><button className="remove-button" value={pokemon.name} onClick={handleRemoveFromTeam}>Remove</button></td>
                </tr>
                </tbody>
                </table>
            </div>
            </li>
            )
        })}
        </ul>
        </div> 
        <div className="my-team-picture">
            <div className="team-poke-container">
                <span className="blueCircle"></span>
                <span className="greenCircle"></span>
                 <span className="yellowCircle"></span>
                <img className="poke-img" src={imageSrc} />
             </div>  
        </div>
    </div>
    <Comments />
</>
    )

}
