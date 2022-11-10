
import {GET_COUNTRIES,FILTER_BY_CONTINENT,FILTER_BY_ORDER, FILTER_BY_POPULATION,FILTER_BY_NAME, GET_ACTIVITIES,FILTER_BY_ACTIVITIES,GET_COUNTRY, POST_ACTIVITY} from '../Action/index.js'

const initialState= {
    countries:[],
    AllCountries: [],
    countriesActivity: [],
    countryDetail:[],
    activities:[],
    activitiesName: []
};

export default function rootReducer(state=initialState,action){
    switch(action.type){
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                AllCountries: action.payload
            }
        case GET_COUNTRY:
            return{
                ...state,
                countryDetail:action.payload
            }
        case GET_ACTIVITIES: 
            let actividades = []
            action.payload.map(e => {
                if(!actividades.includes(e.name)){
                    actividades.push(e.name)
                }
            })
            return {
                ...state,
                activities: action.payload,
                activitiesName:actividades
          }
        case FILTER_BY_CONTINENT:
            const allCountries = state.AllCountries;
            let actividade = state.countriesActivity
            
            if(actividade.length > 0){
                let filtro = action.payload
                let filteeer= actividade.filter(e => e.continente === filtro)
                return {
                    ...state,
                    countries: filtro === 'All' ? actividade : filteeer
                }
            }
            const filtro = action.payload
            const filtrado = allCountries.filter(e => e.continente === filtro)
            return {
                ...state,
                countries : filtro === 'All'? allCountries : filtrado
            }
        case FILTER_BY_ORDER:
            let sortarray = action.payload === 'asc'?
                state.countries.sort(function(a,b){
                    return a.name.localeCompare(b.name)
                }): 
                state.countries.sort(function(a,b){
                    return b.name.localeCompare(a.name)
                })
            return {
                ...state,
                countries: sortarray
            }
        case FILTER_BY_POPULATION:
            let sortArray = action.payload === 'asc' ?
            state.countries.sort(function(a,b){
                return a.poblacion - b.poblacion
            })
            : state.countries.sort(function(a,b){
                return b.poblacion - a.poblacion
            })
            return{
                ...state,
                countries:sortArray
            }
        case FILTER_BY_NAME:
            let {currentOrder,currentPopulation,currentContinent, currentActivity} = action.filtros;
            let sortArray1 = state.AllCountries 
            let sortArray2 = state.countriesActivity
            
                if(currentContinent){
                   let allCountries = state.AllCountries;
                   let filtro = currentContinent
                   sortArray1 = allCountries.filter(e => e.continente === filtro)
                  
                }
                if(!currentContinent || currentContinent === 'All'){
                    let allCountries = state.AllCountries;
                    sortArray1 = allCountries
                }
              
                if(currentOrder){
                     sortArray1 = currentOrder === 'asc'?
                sortArray1.sort(function(a,b){
                    return a.name.localeCompare(b.name)
                }): 
                sortArray1.sort(function(a,b){
                    return b.name.localeCompare(a.name)
                })
                }
                if(currentPopulation){
                     sortArray1 = currentPopulation === 'asc' ?
                    sortArray1.sort(function(a,b){
                        return a.poblacion - b.poblacion
                    })
                    : sortArray1.sort(function(a,b){
                        return b.poblacion - a.poblacion
                    })
                }
                if(currentActivity !== 'All' && currentActivity){
                    let actividades = state.countriesActivity
                    let filter = action.payload
                    let filtrados = actividades.filter(e => e.name.toLowerCase().includes(filter.toLowerCase()))
                         return{
                                ...state,
                                countries : filter === '' ? sortArray2 : filtrados                
                   }
                }
                else{
                         let filter = action.payload
                         let filtrados = sortArray1.filter(e => e.name.toLowerCase().includes(filter.toLowerCase()))
                            return{
                                    ...state,
                                     countries : filter === '' ? sortArray1 : filtrados                
                                    }}
        case FILTER_BY_ACTIVITIES:
            let countries = state.countries;
            let allCountris = state.AllCountries


            return {
                ...state,
                countries: action.filter === 'All' ? allCountris : action.payload,
                countriesActivity: action.filter === 'All' ? allCountris : action.payload
            }
        case POST_ACTIVITY:
            return {
                ...state
            }
        default:
            return state
    }
}