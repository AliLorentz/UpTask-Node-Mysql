const { Sequelize } = require('sequelize');

const db = new Sequelize("uptasknode", 'root', '', {
    host: "localhost",
    dialect: "mysql",
    logging: function () {},
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        paranoid: true
    }
});

module.exports = db;