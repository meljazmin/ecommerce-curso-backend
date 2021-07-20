const utils = require('../utils');
const DatabaseFactory = require('../databases/DatabaseFactory');

class Productos {
    dao;

    constructor() {
        this.dao = DatabaseFactory.getProductosDAO();
    }

    async listar() {
        return await this.dao.read();
    }

    async obtenerPorId(id) {
        return await this.dao.read(id);
    }

    async agregarProducto(nombre, descripcion, codigo, foto, precio, stock) {
        utils.validarCampo(nombre, 'string', 'El nombre no es correcto', () => nombre.length === 0);
        if (typeof descripcion !== 'string' || descripcion.length === 0) {
            throw Error("La descripcion no es correcta");
        }
        if (typeof codigo !== 'string' || codigo.length === 0) {
            throw Error("El codigo no es correcto");
        }
        if (typeof foto !== 'string' || foto.length === 0) {
            throw Error("La foto no es correcta");
        }
        if (typeof precio !== 'number') {
            throw Error("El precio no es correcto");
        }
        if (typeof stock !== 'number') {
            throw Error("El stock no es correcto");
        }

        const timestamp = utils.calcularTimestamp();
        return await this.dao.create({ timestamp, nombre, descripcion, codigo, foto, precio: parseFloat(precio), stock: parseFloat(stock) });
    }

    async actualizarProducto(id, { nombre, descripcion, codigo, foto, precio, stock }) {
        const producto = await this.obtenerPorId(id);
        if (!producto) throw new Error(`No existe el producto con id ${id}`);

        producto.nombre = nombre || producto.nombre;
        producto.descripcion = descripcion || producto.descripcion;
        producto.codigo = codigo || producto.codigo;
        producto.foto = foto || producto.foto;
        producto.precio = parseFloat(precio || producto.precio);
        producto.stock = parseFloat(stock || producto.stock);

        await this.dao.update(id, producto);

        return producto;
    }

    async borrarProducto(id) {
        await this.dao.delete(id);
    }
}


module.exports = new Productos();