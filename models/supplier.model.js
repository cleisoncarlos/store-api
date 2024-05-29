import  Sequelize  from "sequelize";
import db from '../repositories/db.js'

const Supplier = db.define('suppliers', {
    supplierId:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true

    },
    name: {
        type: Sequelize.STRING,
        allowNull: false

    },
    cnpj: {
        type: Sequelize.STRING,
        allowNull: false

    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false

    },
    address: {
        type: Sequelize.STRING,
        allowNull: false

    }
}, 
// underscore true mapeia camelcase pra trabalhar com snakecase que ta no banco de dados
{underscored: true})


export default Supplier


