/**
 * @swagger
 * tags:
 *   name: Pedido
 *   description: Gerenciamento de pedidos
 */

/**
 * @swagger
 * /order:
 *   post:
 *     tags: [Pedido]
 *     summary: Criar novo pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: "Id do usuário que fez o pedido"
 *                 example: "1"
 *               products:
 *                 type: string
 *                 description: "Lista de produtos"
 *                 example: "1, 3, 4, 10" 
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 */

/**
 * @swagger
 * /order:
 *   get:
 *     tags: [Pedido]
 *     summary: Listar todos os pedidos
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 */

/**
 * @swagger
 * /order/{id}:
 *   get:
 *     tags: [Pedido]
 *     summary: Buscar pedido por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido encontrado com sucesso
 *   put:
 *     tags: [Pedido]
 *     summary: Atualizar pedido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: integer
 *                 description: "Id do usuário que fez o pedido"
 *                 example: "1"
 *               products:
 *                 type: string
 *                 description: "Lista de produtos"
 *                 example: "1, 3, 4, 10" 
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso
 *   delete:
 *     tags: [Pedido]
 *     summary: Excluir pedido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido excluído com sucesso
 */

module.exports = app => {

const orderController = require("../controllers/orderController");
const auth = require("../middlewares/authTokenVerify");

app.post('/order', [auth.tokenVerify], orderController.createOrder);
app.get('/order:id', [auth.tokenVerify], orderController.searchById);
app.get('/order', [auth.tokenVerify], orderController.listOrders);
app.put('/order/:id', [auth.tokenVerify], orderController.changeOrder);
app.delete('/order:id', [auth.tokenVerify], orderController.deleteOrder);
}