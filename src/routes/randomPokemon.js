import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux"
import { loadRandomPokemon, selectPokemon, isLoading } from "../slices/randomPokeSlice";
import { addToTeam } from "../slices/teamSlice";

export const RandomPokemon = () => {
    const loading = useSelector(isLoading);
    const dispatch = useDispatch();
    const pokeData = useSelector(selectPokemon);
    
    const handleClick = () => {
        dispatch(loadRandomPokemon(Math.floor(Math.random()* 800)));
    }   
  
    console.log(pokeData);

    const handleAddToTeam = () => {
        dispatch(addToTeam(pokeData));
    }

if (loading) {
    return <div>Finding your pokemon</div>
}

    return (
    <div className="random-poke">
        <h1>Click the button to catch a random pokemon</h1>
        <button type="submit" onClick={handleClick}>Catch em' All</button>&nbsp; &nbsp;
        <button type="submit" value={pokeData} onClick={handleAddToTeam}>Add to my team</button>
        { pokeData && (
            <>
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
            </>
        )}
    </div>
    )
}