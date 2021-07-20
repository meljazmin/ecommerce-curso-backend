const DAOInterface = require('../DAOInterface');

const table = 'productos';

class ProductosDAO extends DAOInterface {
    knex;

    constructor(config) {
        super();
        this.knex = require('knex')(config);
    }

    async create(entity) {
        return await this.knex(table).insert(entity);
    }

    async read(id) {
        if (id) {
            return await this.knex(table).where({ id });
        } else {
            return await this.knex(table);
        }
    }

    async update(id, entity) {
        await this.knex(table).where({ id }).update(entity);
    }

    async delete(id) {
        await this.knex(table).where({ id }).delete();
    }
}

module.exports = ProductosDAO;