import React from "react"
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useParams, Link} from "react-router-dom"
import { getCountry } from "../../Action";
import Cartas from "./Cartas.jsx";
import Loading from "../Loading/Loading.jsx";


export default function Detalles(){
    let {code}= useParams()
    const dispatch= useDispatch();
    const detalles = useSelector((state)=>state.countryDetail)
   
    
    useEffect( ()=>{
         dispatch(getCountry(code))
    },[])
   
    
    return (
    <div id="centro">
        <div > 
        
            <Link id="back" to='/home' > Atras</Link>
                <hr/>
               
                { detalles.code?
                (<Cartas
                code={detalles.code}
                key={detalles.code}                
                name={detalles.name}
                img={detalles.img}                
                continente={detalles.continente} 
                capital={detalles.capital}
                subRegion={detalles.subRegion} 
                area={detalles.area} 
                poblacion={detalles.poblacion}                
                Actividads={detalles.Actividads}
                  
                     />): (<div id="loading">
                        <h3>Cargando</h3>
                        <img src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"/>
                     </div>)}

            {detalles && detalles.img && detalles.img[0] && detalles.code && detalles.code === code &&
            <img src={detalles.img[0]} id='imagen' alt='ImgNotFound' />} 
            </div>
        </div>
    )
}