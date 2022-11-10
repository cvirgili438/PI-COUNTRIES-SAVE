import React from 'react'
import './Detalles.css'


export default function Cartas({name,img,code,continente,subRegion,capital,area,poblacion,Actividads}){
    
    return (
        <div >
            
            <div className='cartitas'>
                <h1>Pais:{name} ({code})</h1>
                <h3>Continente:{continente}</h3>
                <h3>Sub Region:{subRegion}</h3>
                <h4>Capital: {capital}</h4>
                <h4>Posee una Area de {area} metros cuadrados y una poblacion de {poblacion}</h4>
                <p>
                    Las actividades que uno puede realizar en este pais son:</p>
                    
                    {Actividads?.map(e => {
                        return (
                            <div key={e.name}>
                                <p>
                                    {e.name}, en la temporada de {e.temporada}, con una duracion de {e.duracion}hs
                                    aunque su dificultad es de {e.dificultad}/5, creemos que lo disfrutaras al
                                    MAXIMO 
                                </p>
                            </div>
                        )
                    })}
                
            </div>
        </div>
    )
}