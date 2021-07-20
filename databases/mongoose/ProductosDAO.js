const DAOInterface = require('../DAOInterface');
const mongoose = require('mongoose');

const collection = 'productos';

const ProductosSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    codigo: { type: String, required: true },
    foto: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true }
});

const Producto = mongoose.model(collection, ProductosSchema);

class ProductosDAO extends DAOInterface {
    constructor(config) {
        super();
        mongoose.connect(config.url, config.options);
    }

    async create(producto) {
        const doc = new Producto(producto);
        return await doc.save();
    }

    async read(id) {
        if (id) {
            return await Producto.findById(id);
        } else {
            return await Producto.find({});
        }
    }

    async update(id, producto) {
        return await Producto.updateOne({ _id: id }, producto);
    }

    async delete(id) {
        await Producto.deleteOne({ _id: id });
    }
}

module.exports = ProductosDAO;