const { Router } = require('express');
const axios = require('axios');
const {Op,Country, Actividad} = require('../db');
const { getDbInfo,getApiInfo,getAllInfo}=require('./funciones')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();



router.get('/', async (req,res)=>{
        const {name} = req.query;
        const info = await getAllInfo()
        const db = await getDbInfo()
        if(name){
            const nuevo = db.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
            nuevo ? res.status(200).json(nuevo) : res.status(404).send('no existe el pais')
        }
        else res.status(200).json(db)
})
router.get('/:idPais',async (req,res)=>{
    const {idPais} = req.params
    let where = {}
    where.code = idPais.toUpperCase()
    const condition = {}    
    const info = await getAllInfo()
    let isEmpty = Object.entries(req.query).length === 0;    
    if(isEmpty)
    { const noQuery= await Country.findOne({
        where:{
        code: idPais.toUpperCase()},
        include: {
            model: Actividad,
            attributes: ['name', 'dificultad','duracion','temporada'],
            through: ['Country_Code']
          
        }
    }) 
    noQuery ? res.status(200).json(noQuery) : res.status(404).send('no existe pais con este id')}
    
    else if(req.query){
        where = {...where,}
        let atributos = Object.keys(req.query)
        let permitidos = ['name','img','continente','capital','subRegion','area','poblacion',]
        let allowAttributes= []
        for (let i = 0; i < atributos.length; i++) {
            permitidos.forEach(el => {
                if(el.toLowerCase() === atributos[i].toLowerCase()){
                    allowAttributes.push(atributos[i])
                }
            })
            
        } 
        condition.attributes = allowAttributes
        condition.where = where;
        condition.include = {
            model: Actividad,
            attributes: ['name', 'dificultad','duracion','temporada'],
            through: ['Country_Code']
        }
        const nuevo = await Country.findOne(condition)
        if(!nuevo){
           return  res.status(404).send('no existe pais con los datos provistos')
        }
         else if(nuevo){ return res.status(200).json(nuevo)}
        }
})



module.exports = router;
