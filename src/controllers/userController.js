const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = 'pokemon-leaf-green';
const saltRounds = 10;

class UserController{
    // Método para criar um usuário :) ==========================================================================================================================================
    async createUser(req, res) {
	    const name = req.body.name
        const email = req.body.email;
        const password = req.body.password;

	    if (name === undefined || email === undefined || password === undefined ) {
            throw new Error('Nome, email e senha são obrigatórios');
        }

	    try {
            const senhaCriptografada = await bcrypt.hash(password, saltRounds);
            const user = await User.create({ name, email, password: senhaCriptografada });
            return res.status(201).send(user);
	    } catch(error) {
		    return res.status(400).send({ error: error.message })
	    }
    }
    // Método para fazer login do usuário =======================================================================================================================================
    async userLogin(req, res) {
	    const { email, password } = req.body;

	    if (!email || !password) {
            throw new Error('Email e senha são obrigatórios');
        }

	    const user = await User.findOne({ where: { email }});

        if (!user) {
		    throw new Error('Usuário não encontrado');
        }
        
        const validatePassword = await bcrypt.compare(password, user.password);
        
	    if (!validatePassword) {
		    throw new Error('Senha inválida');
        }
        
        try {
		    const jwtToken = jwt.sign({ idUser: user.idUser }, JWT_SECRET_KEY);
		    return res.status(200).send(jwtToken);
	    } catch (error) {
		    return res.status(400).send({ error: error.message })
	    }   
    }
    // Método para buscar um usuário pelo ID ====================================================================================================================================
    async searchById(req, res) {
        const id = req.body.id

        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        return user;
    }
    // Método para listar todos os usuários =====================================================================================================================================
    async listUsers(res) {
        try {
            const users = User.findAll();
            return res.status(200).send(users);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
    // Método para alterar um usuário ===========================================================================================================================================
    async changeUser(req, res) {
      	const { idUser } = req.params;
        const { name, email, password } = req.body;

	    if (idUser === undefined || name === undefined || email === undefined || password === undefined ) {
            throw new Error('Id, nome, email e senha são obrigatórios');
        }

        const user = await this.buscarPorId(idUser);

        try {
            user.name = name;
        	user.email = email;
        	// Cria um hash da senha a partir do bcrypt com 10 rounds
        	const senhaCriptografada = await bcrypt.hash(password, saltRounds);
        	user.password = senhaCriptografada;
            user.save();
            return res.status(200).send(user);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    // Método para deletar um usuário ===========================================================================================================================================
    async deleteUser(req, res) {
        const { idUser } = req.params;

        if (idUser === undefined) {
            throw new Error('Id é obrigatório');
        }

        try {
            const user = await this.searchById(idUser);
            user.destroy();
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
}

module.exports = new UserController();



