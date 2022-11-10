const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('Actividad', {

        name : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true,
            primaryKey: true
        },
        dificultad: {
            type: DataTypes.ENUM('1','2','3','4','5'),
        },
        duracion :{
            type : DataTypes.FLOAT,
            validate: {
                max: 8,
                min: 1
            }
        },
        temporada: {
            type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera')
        }
    },{timestamps:false})
}