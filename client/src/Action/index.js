import axios from 'axios';

export const GET_COUNTRIES = 'GET_COUNTRIES'
export const GET_ACTIVITIES = 'GET_ACTIVITIES'
export const POST_ACTIVITY = 'POST_ACTIVITY'
export const PUT_ACTIVITY = 'PUT_ACTIVITY'
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT'
export const FILTER_BY_ORDER = 'FILTER_BY_ORDER'
export const FILTER_BY_POPULATION= 'FILTER_BY_POPULATION'
export const FILTER_BY_NAME = ' FILTER_BY_NAME'
export const FILTER_BY_ACTIVITIES= 'FILTER_BY_ACTIVITIES'
export const GET_COUNTRY = 'GET_COUNTRY'
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY'



export function getCountries(){
    return async function(dispatch){
        var json = await axios('http://localhost:3001/countries',{});
        return dispatch({
            type: GET_COUNTRIES,
            payload: json.data
        })
    }
}

export function getCountry(code){
    return async function(dispatch){
        let json = await axios(`http://localhost:3001/countries/${code}`)
        return dispatch({
            type: GET_COUNTRY,
            payload: json.data
        })
    }
}
export function getActivities(){
    return async function(dispatch){
        var json= await axios('http://localhost:3001/Actividad',{});
        return dispatch({
            type: GET_ACTIVITIES,
            payload: json.data
        })
    }
    
}
export function filterByActivities(payload){
    return async function(dispatch){
        var json = await axios (`http://localhost:3001/Actividad/${payload}`)
        return dispatch({
            type:FILTER_BY_ACTIVITIES,
            payload: json.data,
            filter: payload

        })
    }
    
}
export function filterByContinent(payload){
    return {
        type: FILTER_BY_CONTINENT,
        payload
    }
}
export function filteredByOrder(payload){
    return{
        type: FILTER_BY_ORDER,
        payload
    }
}
export function filterByPopulation (payload){
    return {
        type: FILTER_BY_POPULATION,
        payload
    }
}

export function filterByName(payload,filtros){
    return {
        type:FILTER_BY_NAME,
        payload,
        filtros: filtros? filtros:{}
    }
}

export function postActivity(payload){
        return  function(dispatch){
            let paises = payload.code
            if(paises.length > 1 ){
                let regulador = []
                let paisesPrueba = paises.shift()
                let json = axios.post('http://localhost:3001/Actividad',{...payload,code:paisesPrueba})
                
                .catch(er => {
                    regulador.push(er)
                    if(er.message.includes('406')){
                    return alert(er.response.data.concat(' Si quiere crear una actividad diferente, Cambie el nombre'))
                }
                    if (er.message.includes('404')){
                        
                        return alert(er.response.data)
                    }
                })
                if (regulador.length === 0 ){ 
                    let promesas = paises.map(e => {
                    let payload1 = {...payload,code:e}
                    let json = axios.post('http://localhost:3001/Actividad',payload1)               
                    
                     })
                  Promise.all(promesas)
                        .then(r => {alert('Se creo correctamente la actividad, redireccionando a HOME');
                  function redireccionar(){
                     let html = window.location
                     html.assign('http://localhost:3000/home')                   
                    } 
                    setTimeout (redireccionar(), 5000);
                              }
                  )
                }
              
          
              
            }
            if (paises.length === 1 ){
                
                let json2 = axios.post('http://localhost:3001/Actividad', payload)
                .then(r => {alert('Se creo correctamente la actividad, redireccionando a HOME');
                function redireccionar(){
                   let html = window.location
                   html.assign('http://localhost:3000/home')                   
                  } 
                  setTimeout (redireccionar(), 5000);
            }
                )
                .catch(er => {if(er.message.includes('406')){
                    return alert(er.response.data.concat(' Si quiere crear una actividad diferente, Cambie el nombre'))
                }
                    if (er.message.includes('404')){
                        return alert(er.response.data)
                    }
                })
            }
            return dispatch({
                type: POST_ACTIVITY,


            })
        }

}

export function deleteActivity(payload){
    return async function(dispatch){
        try{
            var json = await axios.delete(`http://localhost:3001/Actividad/${payload}`)
            
        }
        catch(er){
            console.log(er.message)
        }
        return dispatch({
            type: DELETE_ACTIVITY,
        })
    }
}



