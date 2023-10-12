import React, {useState} from "react"
import { useDispatch } from "react-redux"
import { loadPokemonData } from '../slices/loadPokemonSlice';
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
const [pokemonName, setPokemonName] = useState('')
const dispatch = useDispatch();
const navigate = useNavigate();

const handleChange = (e) => {
    setPokemonName(e.target.value)
}    

const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loadPokemonData(pokemonName));
    navigate("/")
}

const handleKeyUp = (e) => {
  if (e.key === "Enter"){
  e.preventDefault();
  dispatch(loadPokemonData(pokemonName));
  navigate("/")
  }
}

const handleFocus = () => {
  setPokemonName("")
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
                onFocus={handleFocus}
                onKeyUp={handleKeyUp}
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