const Order = require('../models/order');

class OrderController {
    // Método para criar um pedido =============================================================================================================================================
    async createOrder(req, res) {
        const userId = req.body.userId;
        const products = req.body.products;

        if (userId === undefined || products === undefined) {
            throw new Error("Id do usuário, e produto(s) são obrigatórios");
        }

        try {
            const order = await Order.create({ userId, products });
            return res.status(201).send(order);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
    // Método para buscar um pedido pelo ID ====================================================================================================================================
    async searchById(req) {
        const id = req.body.id;

        if (id === undefined) {
            throw new Error("Id do pedido é obrigatório");
        }

        const order = await Order.findByPk(id);
        if (!order) {
            throw new Error("pedido não encontrado");
        }

        return order;
    }
    // Método para listar todos os pedidos =====================================================================================================================================
    async listOrders(res) {
    try {
        const orders = Order.findAll();
        return res.status(200).send(orders);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
    // Método para alterar um pedido ===========================================================================================================================================
    async changeOrder(req, res) {
        const { id } = req.params;
        const { userId, products } = req.body;

        if (id === undefined || userId === undefined || products === undefined) 
        {
            throw new Error("Id do pedido, Id do usuário, e pedidos são obrigatórios");
        }

        const order = await this.searchById(id);

        try {
            order.userId = userId;
            order.products = products;
            order.save();
            return res.status(200).send(order);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
    // Método para deletar um pedido ===========================================================================================================================================
    async deleteOrder(req, res) {
        const { id } = req.params;

        if (id === undefined) {
            throw new Error("Id do pedido é obrigatório");
        }

        try {
            const order = await this.searchById(id);
            order.destroy();
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
}

module.exports = new OrderController();