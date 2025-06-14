const database = require('../config/database');

class OrderProduct {
    constructor() {
        this.model = database.db.define('pedido_produto', {
            idProduct: {
                type: database.db.Sequelize.INTEGER,
                
            },
            idOrder: {
                type: database.db.Sequelize.INTEGER
            }
        });
    }
}

module.exports = (new OrderProduct).model;