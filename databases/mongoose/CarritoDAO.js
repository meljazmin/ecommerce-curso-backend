const DAOInterface = require('../DAOInterface');
const mongoose = require('mongoose');

const collection = 'carrito';

const schema = new mongoose.Schema({
    producto: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cantidad: { type: Number, required: true },
    timestamp: { type: Date, required: true }
});

const model = mongoose.model(collection, schema);

class CarritoDAO extends DAOInterface {
    constructor(config) {
        super();
        mongoose.connect(config.url, config.options);
    }

    async create(entity) {
        const doc = new model(entity);
        return await doc.save();
    }

    async read(id) {
        try {
            if (id) {
                return await model.findById(id);
            } else {
                return await model.find({});
            }
        } catch (e) {
            throw e;
        }
    }

    async update(id, entity) {
        return await model.updateOne({ _id: id }, entity);
    }

    async delete(id) {
        await model.deleteOne({ _id: id });
    }
}

module.exports = CarritoDAO;