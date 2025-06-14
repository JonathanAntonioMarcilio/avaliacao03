/**
 * @swagger
 * tags:
 *   name: Categoria
 *   description: Gerenciamento de categorias
 */

/**
 * @swagger
 * /category:
 *   post:
 *     tags: [Categoria]
 *     summary: Criar nova categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 name: string
 *                 description: "Nome da categoria"
 *                 example: "Eletrônicos"
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 */

/**
 * @swagger
 * /category:
 *   get:
 *     tags: [Categoria]
 *     summary: Listar todas as categorias
 *     responses:
 *       200:
 *         description: Lista de categorias retornada com sucesso
 */

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     tags: [Categoria]
 *     summary: Buscar categoria por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria encontrada com sucesso
 *   put:
 *     tags: [Categoria]
 *     summary: Atualizar categoria
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
 *               name:
 *                 type: string
 *                 description: "Nome da categoria"
 *                 example: "Eletrônicos"
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *   delete:
 *     tags: [Categoria]
 *     summary: Excluir categoria
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria excluída com sucesso
 */

module.exports = app => {
   
const categoryController = require("../controllers/categoryController");
const auth = require("../middlewares/authTokenVerify");

app.post('/category', [auth.tokenVerify], categoryController.createCategory);
app.get('/category:id', [auth.tokenVerify], categoryController.searchById);
app.get('/category', [auth.tokenVerify], categoryController.listCategorys);
app.put('/category/:id', [auth.tokenVerify], categoryController.changeCategory);
app.delete('/category:id', [auth.tokenVerify], categoryController.deleteCategory);
}