const { Country, conn, Actividad,sequelize,Op } = require('../../src/db');
const app = require('../../src/app')
const request = require('supertest');


describe('Country Routes', () => {
    beforeAll(async () => {
      await conn.sync({ force: true });   
      console.log('en marcha');
    });
    describe('Get', () =>{
     

        it('Should get all of the DB and return 200 Status', async () =>{
          const res = await request(app).get('/Countries')          
          expect(res.statusCode).toBe(200)
          expect(res.body).toBeDefined()
          expect(res.body.length).toBeGreaterThan(10)

        })
        it('Should get status 404 if params is wrong' , async ()=>{

          const res = await request(app).get('/Countries/NOTEXIST')
          expect(res.text).toBeDefined()
          expect(res.statusCode).toBe(404)
          
        })
        it('Should get correct country by params' , async ()=>{
          const params = 'ARG'
          const res = await request(app).get(`/Countries/${params}`)
          const argentina= await Country.findOne({
            where:{
            code: params.toUpperCase()},
            include: {
                model: Actividad,
                attributes: ['name', 'dificultad','duracion','temporada'],
                through: ['Country_Code']              
            }
        }) 
        console.log(argentina.dataValues)
          expect(res.body.name).toBe('Argentina') 
          expect(res.body).toEqual(argentina.dataValues)

        })
    })
   
      
    afterAll(async () => {
      await conn.sync({ force: true });
      conn.close();
    })
  });