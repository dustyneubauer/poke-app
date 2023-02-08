import { isLoading, loadPokemonData, selectPokemon } from "../slices/loadPokemonSlice";
import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchTerm } from "../slices/searchSlice";

export const RenderPokemon = () => {
  const dispatch = useDispatch();
  const viewPokemon = useSelector(selectPokemon);
  const viewLoading = useSelector(isLoading);
  const searchTerm = useSelector(selectSearchTerm);

useEffect((searchTerm)=>{
  dispatch(loadPokemonData(searchTerm))
})



render (

)


}