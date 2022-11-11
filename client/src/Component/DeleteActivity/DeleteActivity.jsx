import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { deleteActivity, getActivities,} from "../../Action";
import { Link } from "react-router-dom";
import estilo from './DeleteActivity.module.css'

export default function DeleteActivity (){
    const dispatch = useDispatch();
    const activities = useSelector((state) => state.activitiesName)
    const [select,setSelect] =useState('')
    const [result,setResult] = useState('')

    useEffect(()=>{
        dispatch(getActivities())
    },[])

    function handleSelect(e){
        e.preventDefault();
        setSelect(e.target.value)        
    }
    function handleClick(e){
        e.preventDefault()
        dispatch(getActivities())
    }
    function handleSubmit(e){
        e.preventDefault();
        dispatch(deleteActivity(select))    
        setTimeout(refresh,1000)
    }
    function refresh(){
        let html = window.location
        html.assign('http://localhost:3000/home')             
       } 
       
 
   
   

    return (
        <fieldset className={estilo.fieldset}>
            <legend>Elegi la actividad a borrar</legend>
            <select onClick={e =>handleClick(e) } onChange={e=>handleSelect(e)} >
                <option value={''} selected disabled  hidden >Actividades</option>
                {activities?.map(
                    el => {
                        return (
                            <option key={el}value={el} >{el}</option>
                        )
                    }
                )}
            </select>  
            <button onClick={e =>handleSubmit(e)}>Borrar</button>              
        </fieldset>
    )
}