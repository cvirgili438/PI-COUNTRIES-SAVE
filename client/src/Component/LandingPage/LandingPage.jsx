import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css'
import s from './nuevo1.mp4'


export default function LandingPage(){
    return (
        <div >
            <video id="video"  src={s} autoPlay muted loop type='video/mp4' > </video>
            <div id="country"> 
            <h1>Countries App by Carlos Virgili</h1>
            <Link to= '/home'>
                <button id="start">Inicio</button>
            </Link>
            </div>
        </div>
    )
}