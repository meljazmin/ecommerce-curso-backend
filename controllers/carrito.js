const utils = require('../utils');
const DatabaseFactory = require('../databases/DatabaseFactory');

class CarritoController {
    dao;

    constructor() {
        this.dao = DatabaseFactory.getCarritoDAO();
    }

    async listar() {
        return await this.dao.read();
    }

    async obtenerPorId(id) {
        return await this.dao.read(id);
    }

    async agregar(producto, cantidad) {
        if (typeof producto !== 'object' || !producto.id) {
            throw Error("El producto no es correcto");
        }
        if (typeof cantidad !== 'number') {
            throw Error("La cantidad no es correcta");
        }

        const timestamp = utils.calcularTimestamp();
        return await this.dao.create({ producto, cantidad, timestamp });
    }

    async borrar(id) {
        await this.dao.delete(id);
    }
}

module.exports = new CarritoController();