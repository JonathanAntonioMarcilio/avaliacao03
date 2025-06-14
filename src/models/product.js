const database = require('../config/database');

class Product {
    constructor() {
        this.model = database.db.define('produto', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            categoryId: {
                type: database.db.Sequelize.INTEGER
            },
            name: {
                type: database.db.Sequelize.STRING
            },
            price: {
                type: database.db.Sequelize.DOUBLE
            }
        });
    }
}

module.exports = (new Product).model;