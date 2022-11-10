import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { getCountries,filterByContinent, filteredByOrder,filterByPopulation,filterByName,getActivities,filterByActivities } from "../../Action";
import { Link } from "react-router-dom";
import Cards from "../Cards/Cards.jsx";
import './Home.css'
import Paginado from "../Paginado/Paginado";
import imagen from './imagen.module.css'
import Loading from "../Loading/Loading";

export default function Home(){
    const dispatch = useDispatch()
    const allCountries = useSelector((state)=> state.countries);
    const actividades = useSelector((state)=> state.activitiesName)
    const [continent, setContinent] = useState('')
    const [input,setInput]= useState('')   // input
    const [currentOrder,setCurrentOrder] = useState('')   // estado del Orden
    const [currentPopulation,setCurrentPopulation] = useState('')  // estado de poblacion
    const [currentActivity,setCurrentActivity] = useState('')
    const [loading, setLoading] = useState(false)


    const [currentPage,setCurrentPage] = useState(1)    //paginado
    const [countriesPerPage,setCountriesPerPage]= useState(10); //Paginado
    const indexOfLastCountry = currentPage * countriesPerPage;    //Paginado
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;  // paginado
    const currentCountry = function (){
        if(currentPage === 1 ) return allCountries.slice(indexOfFirstCountry,indexOfLastCountry-1)
        else return allCountries.slice(indexOfFirstCountry,indexOfLastCountry)
    }
     //   paginado
    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)    // paginado
    }


    useEffect( () =>{
        dispatch(getCountries())
        dispatch(getActivities())
    },[])

   function handleByContinent(e){
    e.preventDefault()
   setCurrentPage(1)
    dispatch(filterByContinent(e.target.value))
    setContinent(e.target.value)
   }   
   function handleOrder(e){
    e.preventDefault();    
    dispatch(filteredByOrder(e.target.value))
    setCurrentPage(1);
    setCurrentOrder(e.target.value)    
   }
   function handlePopulation(e){
    e.preventDefault()
    dispatch(filterByPopulation(e.target.value))
    setCurrentPage(1);
    setCurrentPopulation(e.target.value)    
   }
   function handleInput(e){
    e.preventDefault()
    let activity = document.getElementById('actividad')  
    
    let filtros= {
        currentOrder: currentOrder,
        currentPopulation: currentPopulation,
        currentContinent: continent,
        currentActivity: activity.value
        
    }    
    dispatch(filterByName(e.target.value,filtros))
    setCurrentPage(1);
    setInput(e.target.value)
   }
   function handleClickActiviad(e){
    e.preventDefault()
    dispatch(getActivities())
    setCurrentPage(1)
   }
   function handleActivity(e){
    e.preventDefault()    
    dispatch(filterByActivities(e.target.value))
    setCurrentPage(1)
    setCurrentActivity(e.target.value)
    let selects = document.getElementById('form')
    selects.reset()
    let selects2 = document.getElementById('inputPro')
    selects2.value =''
   }
  
    return (
        <div className={imagen.imagenPro} > 
            <div className="general" >
            <Link id="back" to='/home/Actividades' >Crear Actividad</Link>
           
              <h3>Ordernar por:</h3>
                <form id="form"> 
            <select className={imagen.select} onChange={e =>handleOrder(e)}  id="orden" >
                <option value="" defaultValue disabled hidden >Orden Alfabetico</option>
                <option value='asc'>Orden A-Z</option>
                <option value='des'>Orden Z-A</option>
            </select>
            <select className={imagen.select} onChange={e => handlePopulation(e)}>
                <option value="" selected disabled hidden >Orden por Poblacion</option>
                <option value="asc">Menor a mayor</option>
                <option value="des">Mayor a menor</option>
            </select>
           
            <select className={imagen.select} onChange={e =>handleByContinent(e)}>
                <option value="" selected disabled hidden >Continentes</option>
                <option value='All'>Todos</option>
                <option value='Americas'>Americas</option>
                <option value="Asia">Asia</option>
                <option value="Africa">Africa</option>
                <option value="Europe">Europa</option>
                <option value="Oceania">Oceania</option> 
            </select>
                </form>
            <select id="actividad" className={imagen.select}
            onClick={e => handleClickActiviad(e)}
            onChange={e => handleActivity(e)}
            >
                <option value='' selected disabled hidden>Actividades Turisticas</option>
                <option key='All' value="All" >All</option>
                {actividades?.map(e =>{
                    return(
                        <option key={e} value={e}>{e}</option>
                    )
                })}
            </select>
            
            <input id="inputPro" className={imagen.select}
                type='text'                
                placeholder="Ingrese el Pais"
                onChange={e =>handleInput(e)} />
            
            </div>
          <hr/>
          <div>
                <div >
            <Paginado  
            countriesPerPage={countriesPerPage}
            allCountries={allCountries.length}
            paginado={paginado}
            />
            <div className={imagen.number}>
                <h5>Pagina Actual {currentPage}</h5>
            </div>
                    <div className="cards">
            {
            currentCountry().length > 0 ? currentCountry().map(el => {
                    return (                         
                        <Cards 
                        code={el.code}
                        img={el.img}
                        name = {el.name}
                        continente= {el.continente}
                        key= {el.code}
                        />
                    )
                }) : (currentActivity ? <h3 className={imagen.h3furioso}>No existe resultado para dicha combinación</h3>:<Loading />)
            }
                    </div>
                </div>


            </div>
        </div>
        
    )
}