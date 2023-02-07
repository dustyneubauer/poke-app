import { setSearchTerm } from "../slices/searchSlice"
import React, {useState} from "react"
import { useDispatch } from "react-redux"

export const SearchBar = () => {
const [pokemonName, setPokemonName] = useState('')
const dispatch = useDispatch();

const handleChange = (e) => {
    setPokemonName(e.target.value)
}    

const handleSubmit = () => {
    dispatch(setSearchTerm(pokemonName))
}

   return (
   
   <div>
            <form id="search-form" role="search" onSubmit={handleSubmit}>
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
            </form>
            <form>
              <button type="submit">Go</button>
            </form>
    </div>
    )
}