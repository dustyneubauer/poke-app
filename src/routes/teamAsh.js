import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadPokemonData, selectPokemon } from "../slices/loadPokemonSlice";

export const TeamAsh = () => {
    const dispatch = useDispatch();
    const pokeData = useSelector(selectPokemon);
    
    useEffect(()=> {
        dispatch(loadPokemonData())
    },[dispatch])

console.log(pokeData);


}