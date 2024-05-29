import  Sequelize  from "sequelize";
import db from '../repositories/db.js'
import Supplier from "./supplier.model.js";

const Product = db.define('products', {
    productId:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true

    },
    name: {
        type: Sequelize.STRING,
        allowNull: false

    },
    description: {
        type: Sequelize.STRING,
        allowNull: false

    },
    value: {
        type: Sequelize.DOUBLE,
        allowNull: false

    },
    stock: {
        type: Sequelize.INTEGER,
        allowNull: false

    }

}, 
// underscore true mapeia camelcase pra trabalhar com snakecase que ta no banco de dados
{underscored: true})

// relacionamento de tabelas
Product.belongsTo(Supplier, {foreignKey: 'supplierId'})


export default Product


