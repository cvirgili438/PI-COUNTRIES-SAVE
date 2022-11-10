const {Op,Country, Actividad} = require('../db');
const axios = require('axios');
const getDbInfo = async ()=>{
    return await Country.findAll({
        include:{
            model: Actividad,
            attributes: ['name', 'dificultad','duracion','temporada'],
            through: ['Country_Code']
        }
    }) // hacemos la funcion para obtener un array con el contenido de la DB 
   
}
const getApiInfo = async () =>{
    const apiGet = await axios.get('https://restcountries.com/v3/all')
    const apiInfo = await apiGet.data.map(el =>{
        return {
            code : el.cca3,
            name: el.translations.spa.common,
            img: el.flags,
            continente: el.region,
            capital : el.capital,
            subRegion: el.subregion, 
            area : el.area,
            poblacion: el.population
        }
    })
    return apiInfo
}
const getAllInfo = async () =>{
    const dbInfo = await getDbInfo();
    const apiInfo = await getApiInfo()
    if (dbInfo.length < 1) {
        const create = await apiInfo.map(async (el)=>{
            if(el.capital){
                 Country.create({
                    ...el,
                    createInDB: true
                })
            }
        })
    }
    const dbInfoNew = await getDbInfo()
    return dbInfoNew

}
module.exports={ getDbInfo,getApiInfo,getAllInfo}