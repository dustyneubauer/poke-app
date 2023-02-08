import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux"
import { loadRandomPokemon, selectPokemon, isLoading } from "../slices/randomPokeSlice";
import { addToTeam, countData, teamData } from "../slices/teamSlice";

export const RandomPokemon = () => {
    const pokeData = useSelector(selectPokemon);
    const loading = useSelector(isLoading);
    const team = useSelector(teamData);
    const count = useSelector(countData);
    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(loadRandomPokemon(Math.floor(Math.random()* 250)));
    },[dispatch])
    
    
    const handleClick = () => {
        dispatch(loadRandomPokemon(Math.floor(Math.random()* 800)));
    }   
  
    const handleAddToTeam = (e, pokeData) => {
        e.preventDefault();
        dispatch(addToTeam(pokeData));
    }


if (loading) {
    return <div>Finding your pokemon</div>
}

    return (
    <div className="random-poke">
        <h1>Click the button to catch a random pokemon</h1>
        <button type="submit" onClick={handleClick}>Catch em' All</button>&nbsp; &nbsp;
        <button type="submit" onClick={handleAddToTeam}>Add to my team</button>
        <div className="random-pokemon-container">
            <h1>{pokeData.name}</h1>
            <img src={pokeData.sprites.front_shiny} />
            <h3>Moves List</h3>
            <ol>
                {pokeData.moves.map((element)=>{
                    return (
                        <li>{element.move.name}</li>
                    )
                })}
            </ol>
        </div>
    <div className="my-team">
        <div className="pokemon">
            <ol>
            {count > 0 &&
            team.map((pokeData)=> {
                <li><h3>{pokeData.name}</h3>
                <img src={pokeData.sprites.front_shiny} /></li>
            })}
            </ol>
        </div>
     </div>   
    </div>
    )
}