import React from "react";
import { useState} from "react";
import { useDispatch } from "react-redux";
import {filterByName} from '../../Action/index.js'



export default function SearchBar(){
    const [input,setInput] = useState('')
    const dispatch = useDispatch()

    function handleInput(e){
        e.preventDefault()
        dispatch(filterByName(e.target.value))
        setInput(e.target.value)
    }

    
    return(
        <input id="searchBar" placeholder="Filtrar Paises" onChange={e => handleInput(e)}/>
    )
}