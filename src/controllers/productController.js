const Product = require("../models/product");

class ProductController {
    // Método para criar um produto =============================================================================================================================================
    async createProduct(req, res) {
        const categoryId = req.body.categoryId;
        const name = req.body.name;
        const price = req.body.price;

        if (categoryId === undefined || name === undefined || price === undefined) {
            throw new Error("Id da categoria, nome e preço são obrigatórios");
        }

        try {
            const product = await Product.create({ categoryId, name, price});
            return res.status(201).send(product);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
    // Método para buscar um produto pelo ID ====================================================================================================================================
    async searchById(req, res) {
        const id = req.body.id;

        if (id === undefined) {
            throw new Error("Id é obrigatório");
        }

        const product = await Product.findByPk(id);
        if (!product) {
            throw new Error("Produto não encontrado");
        }

        return product;
    }
    // Método para listar todos os produtos =====================================================================================================================================
    async listProducts(req, res) {
    try {
        const products = Product.findAll();
        return res.status(200).send(products);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
    // Método para alterar um produto ===========================================================================================================================================
    async changeProduct(req, res) {
        const { id } = req.params;
        const { categoryId, name, price } = req.body;

        if (id === undefined || categoryId === undefined || name === undefined || price === undefined) 
        {
            throw new Error("Id do produto, Id da categoria, nome e preço são obrigatórios");
        }

        const product = await this.searchById(id);

        try {
            product.categoryId = categoryId;
            product.name = name;
            product.price = price;
            product.save();
            return res.status(200).send(product);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
    // Método para deletar um produto ===========================================================================================================================================
    async deleteProduct(req, res) {
        const { id } = req.params;

        if (id === undefined) {
            throw new Error("Id do produto é obrigatório");
        }

        try {
            const product = await this.searchById(id);
            product.destroy();
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
}

module.exports = new ProductController();
