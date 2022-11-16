const { Country, conn, Actividad,sequelize } = require('../../src/db');


describe('Country Model', () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
    console.log('en marcha');
  });

  describe('Parte UNO', () => {
    it('should not create the Country if name is not send', async () => {
      expect.assertions(1);
      try {
        await Country.create({area: 100, poblacion: 150});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
 
       
  
    it('should create the Country if all required properties are ok', async () => {
      const pais = await Country.create({
        code: 'ARG',
          name: 'Argentina',
          img: ['imagen de prueba'],
          capital: ['Buenos Aires'],
          continente: 'America',
          
      })
      

      expect(pais.toJSON()).toEqual({
        code: 'ARG',
        name: 'Argentina',
        img: ['imagen de prueba'],
        capital: ['Buenos Aires'],
        continente: 'America',
        subRegion: null,
        area: null,
        poblacion: null
      });
    });
  
    it('should not create two Countrys with the same name', async () => {
      expect.assertions(1);
      try {
        const CountryOne = await Country.create({
          code: 'ARG',
          name: 'Argentina',
          img: ['imagen de prueba'],
          capital: ['Buenos Aires'],
          continente: 'America'
        })
        expect(CountryOne.toJSON()).toEqual({
          code: 'ARG',
          name: 'Argentina',
          img: ['imagen de prueba'],
          capital: ['Buenos Aires'],
          continente: 'America',
          subRegion: null,
        area: null,
        poblacion: null
        });
        await Country.create({
          code: 'SUE',
          name: 'Argentina',
          img: ['imagen de prueba'],
          capital: ['Buenos Aires'],
          continente: 'America'
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  })
    
  afterAll(async () => {
    await conn.sync({ force: true });
    conn.close();
  })
});