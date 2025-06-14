const Category = require('../models/category');

class CategoryController {
    // Método para criar uma categoria =============================================================================================================================================
    async createCategory(req, res) {
        const name = req.body.name;

        if (name === undefined) {
            throw new Error("Nome da categoria é obrigatório");
        }

        try {
            const category = await Category.create({ name });
            return res.status(201).send(category);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
    // Método para buscar uma categoria pelo ID ====================================================================================================================================
    async searchById(req) {
        const id = req.body.id;

        if (id === undefined) {
            throw new Error("Id da categoria é obrigatório");
        }

        const category = await Category.findByPk(id);
        if (!category) {
            throw new Error("pedido não encontrado");
        }

        return category;
    }
    // Método para listar todas as categorias =====================================================================================================================================
    async listCategorys(res) {
    try {
        const categorys = Category.findAll();
        return res.status(200).send(categorys);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
    // Método para alterar uma categoria ===========================================================================================================================================
    async changeCategory(req, res) {
        const { id } = req.params;
        const { name } = req.body;

        if (id === undefined || name === undefined) 
        {
            throw new Error("Id da categoria e nome da categoria são obrigatórios");
        }

        const category = await this.searchById(id);

        try {
            category.name = name;
            category.save();
            return res.status(200).send(category);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
    // Método para deletar uma categoria ===========================================================================================================================================
    async deleteCategory(req, res) {
        const { id } = req.params;

        if (id === undefined) {
            throw new Error("Id do pedido é obrigatório");
        }

        try {
            const category = await this.searchById(id);
            category.destroy();
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
}

module.exports = new CategoryController();