const { Router } = require('express');
const {Op,Country, Actividad} = require('../db');
const axios = require('axios');
const { getDbInfo,getApiInfo,getAllInfo}=require('./funciones')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.post('/', async (req,res)=>{
    const get = await getAllInfo()
    const {name,dificultad,duracion,temporada,code} = req.body;
    if(!name||!dificultad||!duracion||!temporada||!code){
        return res.status(404).send('completar los 5 datos apropiadamente')
    }
    const busqueda = await Actividad.findOne({
        where:{
            name:name.toLowerCase()
        }
    })
    if(busqueda){
        let country = await Country.findOne({
            where: {code: code}
        })
        busqueda.addCountry(country,{through:'Country_Code'})
        return res.status(406).send('Actividad existente, se agrego el/los pais/es a la anterior mencionada')

    }
    const actividad= await Actividad.create({
        name: name.toLowerCase(),
        dificultad: dificultad,
        duracion:duracion,
        temporada:temporada
            },{
                include: [Country]
            })
    const pais = await Country.findOne({
        where:{code:code}
    })    
    actividad.addCountry(pais,{through:'Country_Code'})
    return res.status(200).send('Actividad creada')
})
router.get('/', async (req,res)=>{
    const actividad = await Actividad.findAll({
        include: [Country]
    })
    return actividad.length < 1 ? res.status(404).send('no hay Actividades') : res.status(200).json(actividad)
    
})

router.get('/:Activity' , async (req,res)=>{
    const {Activity} = req.params;
    const countris = await Country.findAll({
                include:[{
                    model: Actividad,
                    where:{
                        name:Activity
                    }
                }]
    })
    res.json(countris)
})



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
