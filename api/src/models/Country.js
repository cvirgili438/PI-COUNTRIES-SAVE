const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    code :{
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey:true,
      validate : {
        sonLetras(value){
          let array = value.split('');
          let comprobacion = [];
          array.forEach(el => {
            if (!isNaN(el)){comprobacion.push(el)}
          })
          if (comprobacion.length > 0 ){ throw new Error('el codigo provisto no son de 3 letras')}
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    img : {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      unique:true,      
    },
    continente: {
      type: DataTypes.STRING,
      allowNull : false      
    },
    capital : {
      type : DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    subRegion: {
      type : DataTypes.STRING,

    },
    area: {
      type: DataTypes.FLOAT,
      
    },
    poblacion : {
      type: DataTypes.INTEGER,
    },
    createInDB: {
      type: DataTypes.BOOLEAN
    }
  },{timestamps: false});
};
