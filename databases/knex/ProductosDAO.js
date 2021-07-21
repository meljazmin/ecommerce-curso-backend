const DAOInterface = require('../DAOInterface');

const table = 'productos';

class ProductosDAO extends DAOInterface {
    knex;

    constructor(config) {
        super();
        this.knex = require('knex')(config);
    }

    async create(entity) {
        const id = await this.knex(table).insert(entity);
        return this.read(id);
    }

    async read(id) {
        if (id) {
            return await this.knex(table).where({ id }).first();
        } else {
            return await this.knex(table);
        }
    }

    async update(id, entity) {
        await this.knex(table).where({ id }).update(entity);
        return this.read(id);
    }

    async delete(id) {
        await this.knex(table).where({ id }).delete();
    }
}

module.exports = ProductosDAO;