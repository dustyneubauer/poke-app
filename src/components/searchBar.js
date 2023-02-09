import { setSearchTerm } from "../slices/searchSlice"
import React, {useState} from "react"
import { useDispatch } from "react-redux"
import { loadPokemonData } from '../slices/loadPokemonSlice';

export const SearchBar = () => {
const [pokemonName, setPokemonName] = useState('')
const dispatch = useDispatch();

const handleChange = (e) => {
    setPokemonName(e.target.value)
}    

const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loadPokemonData(pokemonName));
}

   return (
   
   <div>
              <input
                id="q"
                aria-label="Search Players"
                placeholder="Find a Pokemon"
                type="search"
                name="q"
                onChange={handleChange}
                value={pokemonName}
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
              <button onClick={handleSubmit}>Go</button>
            
    </div>
    )
}