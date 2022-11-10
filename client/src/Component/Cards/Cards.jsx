import { Link } from "react-router-dom"
import './Cards.css'

export default function Cards({code,name,img,continente}){
        return (
            <div className="cartas">
               <Link to= {`/home/${code}`}> <img src={img[0]} alt='Img Not Found' width='200px' height='100px' /></Link>
                <Link to= {`/home/${code}`}><h3>{name}</h3></Link>
                <h5>{continente}</h5>
                 
                
            </div>
        )
}