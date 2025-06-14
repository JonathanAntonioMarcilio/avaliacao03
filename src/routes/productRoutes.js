/**
 * @swagger
 * tags:
 *   name: Produto
 *   description: Gerenciamento de produtos
 */

/**
 * @swagger
 * /product:
 *   post:
 *     tags: [Produto]
 *     summary: Criar novo produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: integer
 *                 description: "Id da categoria"
 *                 example: "1"
 *               name:
 *                 type: string
 *                 description: "Nome do produto"
 *                 example: "Celular Sansung Galaxy A15" 
 *               price:
 *                 type: float
 *                 description: "Preço do produto"
 *                 example: "809,45"
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 */

/**
 * @swagger
 * /product:
 *   get:
 *     tags: [Produto]
 *     summary: Listar todos os produtos
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 */

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     tags: [Produto]
 *     summary: Buscar produto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto encontrado com sucesso
 *   put:
 *     tags: [Produto]
 *     summary: Atualizar produto
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
 *                 description: "Id da categoria"
 *                 example: "1"
 *               name:
 *                 type: string
 *                 description: "Nome do produto"
 *                 example: "Celular Sansung Galaxy A15" 
 *               price:
 *                 type: float
 *                 description: "Preço do produto"
 *                 example: "809,45"
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *   delete:
 *     tags: [Produto]
 *     summary: Excluir produto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto excluído com sucesso
 */

module.exports = app => {

const productController = require("../controllers/productController");
const auth = require("../middlewares/authTokenVerify");

app.post('/product', productController.createProduct);
app.get('/product/:id', [auth.tokenVerify], productController.searchById);
app.get('/product', productController.listProducts);
app.put('/product/:id', [auth.tokenVerify], productController.changeProduct);
app.delete('/product:id', [auth.tokenVerify], productController.deleteProduct);
}