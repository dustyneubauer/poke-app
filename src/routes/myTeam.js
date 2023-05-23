import { teamData, removeFromTeam } from "../slices/teamSlice";
import { useSelector, useDispatch } from "react-redux";
import React, {useState} from "react";
import { Comments } from "../components/comments";
import { username} from "../slices/userSlice";

export const MyTeam = () => {
    const myTeam = useSelector(teamData)
    const dispatch = useDispatch();
    const user = useSelector(username);

const [imageSrc, setImageSrc] = useState("");
const [moves, setMoves] = useState("");

const handleRemoveFromTeam = (e) => {
    dispatch(removeFromTeam(e.target.value))
}

const handleHover = (e) => {
    console.log(e.target)
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
        <ul>
        {myTeam.map((pokemon)=>{
            console.log(pokemon.name)
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
