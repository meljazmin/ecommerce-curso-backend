const express = require('express');
const carrito = require('../controllers/carrito');
const productos = require('../controllers/productos');

const router = express.Router();

/**
 * Metodo para obtener el path param "id" desde el objeto req {@link express.Request}.
 * 
 * Si el param existe, devuelve el id en tipo numerico.
 * 
 * Si el param no existe, setea el response con 400 Bad Request y retorna.
 * @param {*} req 
 * @returns 
 */
const getIdFromRequestParams = (req) => {
    let id = req.params.id;

    if (!id) throw Error('Id nulo');

    return id.toString();
}

router.get('/listar/:id?', async (req, res, next) => {
    try {
        const id = req.params.id;
        let resBody;
        if (id) {
            const item = await carrito.obtenerPorId(id);
            if (!item) {
                res.status(404).send({ error: 'Item no encontrado' });
                return;
            } else {
                resBody = item;
            }
        } else {
            const items = await carrito.listar();
            if (items.length === 0) {
                res.status(404).send({ error: 'No hay items en el carrito' });
                return;
            } else {
                resBody = items;
            }
        }
        res.send(resBody);
    } catch (e) {
        next(e);
    }
});

router.post('/agregar/:idProducto', async (req, res, next) => {
    try {
        const idProducto = req.params.idProducto;
        let { cantidad } = req.body;
        cantidad = parseInt(cantidad);
        const producto = await productos.obtenerPorId(idProducto);
        try {
            const item = await carrito.agregar(producto, cantidad);
            res.status(201).send(item);
        } catch (e) {
            res.status(400).send({ error: e.toString() });
        }
    } catch (e) {
        next(e);
    }
});

router.delete('/borrar/:id', async (req, res, next) => {
    try {
        const id = getIdFromRequestParams(req);
        if (!id) return;

        await carrito.borrar(id);

        res.status(204).send();
    } catch (e) {
        next(e);
    }
});

module.exports = router;