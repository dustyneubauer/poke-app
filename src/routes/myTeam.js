import { teamData, removeFromTeam } from "../slices/teamSlice";
import { useSelector, useDispatch } from "react-redux";
import React, {useState} from "react";

export const MyTeam = () => {
    const myTeam = useSelector(teamData)
    const dispatch = useDispatch();

const [imageSrc, setImageSrc] = useState("");


const handleRemoveFromTeam = (e) => {
    dispatch(removeFromTeam(e.target.value))
    console.log(e.target.value);
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
    <div className="my-team-page">
       <div className="my-team-info">
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
                </tr>
                <tr className="remove-button">
                <td><button className="remove-button" value={pokemon.name} onClick={handleRemoveFromTeam}>Remove</button></td>
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
            <div className="poke-container">
                <span className="blueCircle"></span>
                <span className="greenCircle"></span>
                 <span className="yellowCircle"></span>
                <img className="poke-img" src={imageSrc} /> 
             </div>  
        </div>
    </div>
    )

}
