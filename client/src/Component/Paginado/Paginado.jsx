import React from "react";
import './Paginado.css'


export default function Paginado ({countriesPerPage, allCountries,paginado}) {
    const pageNumbers = [];

    for (let i = 0;  i  <= Math.ceil(allCountries/countriesPerPage); i++) {
        pageNumbers.push(i+1)
        
    }
    pageNumbers.pop()
    return (
        <nav>
            <ul className="paginado">
                {
                    pageNumbers?.map(number =>{
                        return (
                            <li     className="number" key={number}>
                                <a onClick={() =>paginado(number)}>
                                    {number}
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}