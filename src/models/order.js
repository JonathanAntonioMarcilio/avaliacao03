const database = require('../config/database');

class Order {
    constructor() {
        this.model = database.db.define('pedido', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: database.db.Sequelize.INTEGER
            },
            products: {
                type: database.db.Sequelize.STRING
            }
        });
    }
}

module.exports = (new Order).model;