/**
 * @swagger
 * tags:
 *   name: Usuario
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /user:
 *   post:
 *     tags: [Usuario]
 *     summary: Criar novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Nome do usuário"
 *                 example: "João da Silva"
 *               email:
 *                 type: string
 *                 description: "Email do usuário"
 *                 example: "joao@gmail.com" 
 *               password:
 *                 type: string
 *                 description: "Senha do usuário"
 *                 example: "batatinha123"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags: [Usuario]
 *     summary: Login de usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: "Email do usuário"
 *                 example: "joao@gmail.com" 
 *               senha:
 *                 type: string
 *                 description: "Senha do usuário"
 *                 example: "batatinha123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 */

/**
 * @swagger
 * /user:
 *   get:
 *     tags: [Usuario]
 *     summary: Listar todos os usuários
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags: [Usuario]
 *     summary: Buscar usuário por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *   put:
 *     tags: [Usuario]
 *     summary: Atualizar usuário
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
 *                 description: "Nome do usuário"
 *                 example: "João da Silva"
 *               email:
 *                 type: string
 *                 description: "Email do usuário"
 *                 example: "joao@gmail.com" 
 *               password:
 *                 type: string
 *                 description: "Senha do usuário"
 *                 example: "batatinha123"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *   delete:
 *     tags: [Usuario]
 *     summary: Excluir usuário
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 */

module.exports = app => {

const userController = require("../controllers/userController");
const auth = require("../middlewares/authTokenVerify");

app.post('/user', userController.createUser);
app.post('/user/login', userController.userLogin);
app.get('/user/:id', [auth.tokenVerify], userController.searchById);
app.get('/user', [auth.tokenVerify], userController.listUsers);
app.put('/user/:id', [auth.tokenVerify], userController.changeUser);
app.delete('/user:id', [auth.tokenVerify], userController.deleteUser);
}