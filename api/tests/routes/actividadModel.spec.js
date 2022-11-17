const { Country, conn, Actividad,sequelize,Op } = require('../../src/db');
const app = require('../../src/app')
const request = require('supertest');




describe('Country Routes', () => {
    beforeAll(async () => {
      await conn.sync({ force: true });   
      console.log('en marcha');
    });
   describe ('Post',()=>{

    it("shouldn't create a activity without all parameters", async ()=>{
        const parametros = {name : 'prueba', dificultad:5,}
        const res = await request(app).post('/Actividad').send(parametros)
        expect(res.statusCode).toBe(404)
        expect(res.text).toBeDefined()
    })
   })
   it("should create activity with all pararmeters ok ",async ()=>{

        const futbol = {
            name:'futbol',
            dificultad:'1',
            temporada:'Otoño',
            duracion:3,
            code:'ARG'
        }
        const res = await request(app).post('/Actividad').send(futbol)
        const algo = await Actividad.findOne({where:{name:'futbol'}})
     
        expect(res.statusCode).toBe(200)
        expect(res.text).toEqual('Actividad creada')
        expect(algo.dataValues).toEqual({
            id: 1,
            name:"futbol",
            dificultad:"1",
            duracion:3,
            temporada:"Otoño"
        })
   })
    it("Shouldn't create two Activities with the same name", async ()=>{
        
        const futbol = {
            name:'futboli',
            dificultad:'1',
            temporada:'Otoño',
            duracion:3,
            code:'ARG'
        }
        const futbol2 = {
            name:'futboli',
            dificultad:'5',
            temporada:'Otoño',
            duracion:3,
            code:'ARG'
        }
        const res = await request(app).post('/Actividad').send(futbol)
        const res2 = await request(app).post('/Actividad').send(futbol2)
        expect(res2.statusCode).toBe(404)
        expect(res2.text).toBeDefined()
    })
     
    
      
    afterAll(async () => {
      await conn.sync({ force: true });
      conn.close();
    })
  });