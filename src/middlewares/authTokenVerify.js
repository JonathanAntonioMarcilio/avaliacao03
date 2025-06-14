const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = 'pokemon-leaf-green';

class TokenVerify{
    async tokenVerify(req, res, next) {
        const token = req.headers.authorization;
        try {
            // Verifica se o token é válido e retorna o payload
            const payload = jwt.verify(token, JWT_SECRET_KEY);
            return payload;
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
}

module.exports = new TokenVerify();