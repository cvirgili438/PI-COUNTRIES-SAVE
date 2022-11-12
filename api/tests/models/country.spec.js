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
      const Country = await Country.create({
        code: 'ARG',
          name: 'Argentina',
          img: ['imagen de prueba'],
          capital: ['Buenos Aires'],
          continente: 'America'
      })
      expect(Country.toJSON()).toEqual({
        code: 'ARG',
        name: 'Argentina',
        img: ['imagen de prueba'],
        capital: ['Buenos Aires'],
        continente: 'America'
      });
    });
  
    it('should not create two Countrys with the same name', async () => {
      expect.assertions(2);
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
          continente: 'America'
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

  // describe('Parte DOS', () => {
  //   it('should not create the Country if name is forbidden', async () => {
  //     expect.assertions(1);
  //     try {
  //       await Country.create({
  //         code: 'HENRY',
  //         name: 'Henry',
  //         hp: 100.0,
  //         mana: 150.0
  //       })
  //     } catch (error) {
  //       expect(error.message).toBeDefined();
  //     }
  //   });
  
  //   it('should not create the Country if code is forbidden', async () => {
  //     expect.assertions(1);
  //     try {
  //       await Country.create({
  //         code: 'HeNrY',
  //         name: 'Valid Name',
  //         hp: 100.0,
  //         mana: 150.0
  //       })
  //     } catch (error) {
  //       expect(error.message).toBeDefined();
  //     }
  //   });
  
  //   it('should not create the Country if code is forbidden', async () => {
  //     expect.assertions(1);
  //     try {
  //       await Country.create({
  //         code: 'henRY',
  //         name: 'Valid Name Two',
  //         hp: 100.0,
  //         mana: 150.0
  //       })
  //     } catch (error) {
  //       expect(error.message).toBeDefined();
  //     }
  //   });
  // })

  afterAll(async () => {
    await conn.sync({ force: true });
    conn.close();
  })
});