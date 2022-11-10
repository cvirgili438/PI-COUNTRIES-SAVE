import React from "react";
import './CrearActividad.css'
import { useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCountries,getActivities, postActivity } from "../../Action";
import SearchBar from "./SearchBar.jsx";


export function validate(input){
    let error= {};
    if(!input.name){error.name= 'Se requiere un nombre'} 
   
    if(!input.dificultad) {error.dificultad= 'Se Requiere un Dificultad'}
    if(!input.temporada) {error.temporada= 'Se requiere una Temporada'}
    if(!input.duracion) {error.duracion= 'Se requiere una duracion'}
    if(!input.code) {error.code= 'No elejiste Paises'}
    
    return error
    
 }

export default function CrearActividad(){
    const dispatch = useDispatch()
    const[error,setError] = useState({})
    const [input,setInput] = useState({
        name: '',        
        dificultad:'',
        temporada:'',
        duracion: '',
        code: []
    })    
    const allCountries = useSelector((state)=> state.countries);
    const activitiesName = useSelector((state)=>state.activitiesName)
    useEffect (()=>{
        dispatch(getCountries())
        dispatch(getActivities())
    },[])

    function handleName (e){
        e.preventDefault();
        let filtro = activitiesName.filter(ele =>ele.toLowerCase().includes(e.target.value.toLowerCase()) )
        if(filtro.length === 0 ){
            setInput({
                ...input,
                name: e.target.value.toLowerCase()
            })
        }
        else {
            setInput({
                ...input,
                name : filtro[0]
            })
        }
    }
    function handleSelectorPais(e){
        e.preventDefault()
        let filtro = input.code.filter(ele => ele.includes(e.target.value))
        let paises= input.code
        if(filtro.length === 0 ){setInput({
            ...input,
            code: paises.concat(e.target.value)
        })}
    }
    function handleDeletedSelectorPais (e){
        e.preventDefault()
        console.log(e.target.value)
        console.log(input)
        if(e.target.value === 'All'){
            let array= []
            setInput({
                ...input,
                code:array
            })
        }
       else {let paises = input.code.filter(ele => !ele.includes(e.target.value))
        setInput({
            ...input,
            code:paises
        })}
    }
    function handleDuracion (e){
        e.preventDefault()
        setInput({
            ...input,
            duracion:e.target.value
        })
    }
    function handleTemporada (e){
        e.preventDefault()
        setInput({
            ...input,
            temporada:e.target.value
        })
    }
    function handleDificultad(e){
        e.preventDefault()
        setInput({
            ...input,
            dificultad: e.target.value
        })
    }
    function handleSubmit(e){
        e.preventDefault();
        setError(validate(input))
        let errores = Object.keys(error)
        if (errores.length === 0){
            var paises = input.code
            dispatch(postActivity(input,paises))}
            
        if(error.name || error.dificultad || error.temporada|| error.duracion||error.code === []){
            alert('Faltan Datos')
        }

        const formulario = document.getElementById('actividadesForm').reset()
        
        setInput({name: '',        
        dificultad:'',
        temporada:'',
        duracion: '',
        code: []})
          
    }
  
    return (
        <div id="divActivity">
            <Link id="back" to='/home' > Atras</Link>
            <div id="divisor">
            { allCountries? (<form  id="actividadesForm">
                <h3 id="create">Crea tu Actividad</h3>
                <input required id="Actividadss" placeholder="Actividad" onChange={e => handleName(e)} />
                <div>
                    <SearchBar/>
                <select required  id="selectorPais" onChange={e => handleSelectorPais(e)}>
                    <option value='' selected  >Selecciona el/los Paises</option>
                    {allCountries.sort(function(a,b){
                    return a.name.localeCompare(b.name)
                }).map(el => {
                        return(
                            <option key={el.code} value={el.code}>{el.name}</option>
                        )
                    })}
                </select>
                {input && input.code && input.code.length > 0 && <p>Eliminar No Deseados</p>}
                {input && input.code && input.code.length > 0 &&(
                     <select onChange={e => handleDeletedSelectorPais(e)}> 
                     <option defaultValue=''  selected  >Paises Seleccionados</option>
                     <option value='All' >Limpiar Lista</option>
                     {input.code.map(e => {
                        return (
                            <option value={e} key={e} >{e}</option>
                        )
                     })}
                 </select>  
                )}               
                </div>
                <div>                     
                        <select required id="nuevito" onChange={e => handleDuracion(e)}  >
                            <option value="" selected disabled hidden >Duracion</option>
                            <option value="1">1 hora</option>
                            <option value="2">2 horas</option>
                            <option value="3">3 horas</option>
                            <option value="4">4 Horas</option>
                            <option value="5">5 Horas</option>
                            <option value="6">6 Horas</option>
                            <option value="7">7 Horas</option>
                            <option value="8">8 Horas</option>
                        </select>                    
                </div>
                <label>
                    <select required id="temporada" onChange={e =>handleTemporada(e)} >
                        <option value="" selected disabled hidden > Temporada</option>
                        <option value="Invierno">Invierno</option>
                        <option value="Verano">Verano</option>
                        <option value="Otoño">Otoño</option>
                        <option value="Primavera">Primavera</option>
                    </select>
                </label>
                <label>
                    <select required  onChange={e =>handleDificultad(e)}>
                        <option value="" selected disabled hidden> Dificultad</option>
                        <option value="1">Dificultad 1: Muy Facil</option>
                        <option value="2">Dificultad 2: Facil</option>
                        <option value="3">Dificultad 3: Mediana</option>
                        <option value="4">Dificultad 4: Dificil</option>
                        <option value="5">Dificultad 5: Muy Dificil</option>
                    </select>
                </label>
                <button onClick={e => handleSubmit(e)}>Crear Datos</button>
            </form>): <h3>Loading</h3>}
            </div>
        </div>
    )
}