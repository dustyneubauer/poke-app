import { selectPokemon } from "../slices/loadPokemonSlice";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToTeam, teamData } from "../slices/teamSlice";

export const PokemonInfo = () => {
    const pokeData = useSelector(selectPokemon);
    const dispatch = useDispatch();
    const myTeam = useSelector(teamData);

console.log(myTeam);

const handleAddToTeam = () => {
  dispatch(addToTeam(pokeData));
}

  if (!pokeData) {
    return (
      <div>
        <h1>Use the search to find a Pokemon</h1>
      </div>
    )
    }
return (
  <>
   <button type="submit" value={pokeData} onClick={handleAddToTeam}>Add to my team</button>
   { pokeData && (
  <div className="random-pokemon-container">
    <div className="poke-container">
          <span className="blueCircle"></span>
          <span className="greenCircle"></span>
          <span className="yellowCircle"></span>
      <h1>{pokeData.name.toUpperCase()}</h1>
      <img className="poke-img" src={pokeData.sprites.front_shiny} /> 
      <h3>Moves List</h3>
      </div>  
      <ol>
          {pokeData.moves.map((element)=>{
              return (
                  <li key={element.move.name}>{element.move.name}</li>
              )
          })}
      </ol>
  </div>
   )}
</>
)}