const Sequelize = require('sequelize')

const sha1 = require('sha1');  // Ensure sha1 is required if using it

// Initialize the Sequelize instance correctly
const db = new Sequelize(
  'bke0yfbakk3qqmf6z3lx',       // Database name
  'ulqhgsnuaji96bwq',       // MySQL username
  'INhxf20szilb5DDkVv0U',           // MySQL password
  {
    host: 'bke0yfbakk3qqmf6z3lx-mysql.services.clever-cloud.com', // MySQL server host
    dialect: 'mysql',  // Database dialect
  }
);

const School = db.define('schools', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: Sequelize.STRING,
        defaultValue: ""
    },
    address : {
        type : Sequelize.TEXT,
        defaultValue : ""
    },
    latitude : {
        type : Sequelize.FLOAT,
        allowNull: true,
    },
    longitude : {
        type : Sequelize.FLOAT,
        allowNull: true,
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
    },
}, {
    timestamps: true,
    tableName: 'schools'
    
})

db.sync({ alter: true })  // Change to `force: true` if you want to drop and recreate the table
  .then(() => console.log('Database & tables created/updated!'))
  .catch(err => console.error('Error creating database & tables:', err));

module.exports = School;