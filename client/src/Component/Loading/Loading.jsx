import imagen from '../Home/imagen.module.css'


export default function Loading(){
    return (
        <div className = {imagen.loading}>
            <img  src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif" 
            alt="Cargando" />
        </div>
    )
}