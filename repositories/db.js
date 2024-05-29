import { Sequelize } from 'sequelize';
import 'dotenv/config'



//'database', 'username', 'password'
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "postgres",
    // se não colocar o define ele gera tabelas de data de criação e alteração 
    define: {
        timestamps: false
    },
   logging: false // não retorna oo teste de conexão 'SELECT 1+1 AS result'
  }
)


// Test connection and log errors
sequelize.authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.');
  })
  .catch(err => {
    logger.error(`Unable to connect to the database: ${err.message}`);
    });

export default sequelize