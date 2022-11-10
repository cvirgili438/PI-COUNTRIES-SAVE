const { Country, conn, Activcodead,sequelize } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Valcodeators', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valcode name')))
          .catch(() => done());
      });
      it('should work when its a valcode name', () => {
        Country.create({ name: 'Argentina' });
      });
    });
  });
});
 describe ('modelo global', ()=>{
 
  it('no debe crear un Pais sino se proporcionan los datos necesarios', async()=>{
    expect.assertions(1)
    try {
        await Country.create({
          name : 'Argentina'
        })
    }
    catch (er){
      expect(er.message).toBeDefined()
    }
  });
  it('crea correctamente la base un pais ', async () =>{
    expect.assertions(1)
   
      const pais = await Country.create({
        code :'arg',
        name :'Argentina',
        img : 'img de prueba',
        continente : 'America',
        capital : 'Buenos Aires',
        subRegion : 'Amerca del sur ',
        area : 1213,
        poblacion: 1234
      })
      expect(pais.toJSON()).toEqual({
        code :'arg',
        name :'Argentina',
        img : 'img de prueba',
        continente : 'America',
        capital : 'Buenos Aires',
        subRegion : 'America del sur ',
        area : 1213,
        poblacion: 1234
      })
    
   
    
  });
 })
