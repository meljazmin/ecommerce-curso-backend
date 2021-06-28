const express = require('express');
const carrito = require('../api/carrito');
const productos = require('../api/productos');

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

    return Number(id);
}

router.get('/listar/:id?', (req, res) => {
    const id = parseInt(req.params.id);
    let resBody;
    if (id) {
        const item = carrito.obtenerPorId(id);
        if (!item) {
            res.status(404).send({ error: 'Item no encontrado' });
            return;
        } else {
            resBody = item;
        }
    } else {
        const items = carrito.listar();
        if (items.length === 0) {
            res.status(404).send({ error: 'No hay items en el carrito' });
            return;
        } else {
            resBody = items;
        }
    }
    res.send(resBody);
});

router.post('/agregar/:idProducto', (req, res) => {
    const idProducto = parseInt(req.params.idProducto);
    let { cantidad } = req.body;
    cantidad = parseInt(cantidad);
    const producto = productos.obtenerPorId(idProducto);
    try {
        const item = carrito.agregar(producto, cantidad);
        res.status(201).send(item);
    } catch (e) {
        res.status(400).send({ error: e.toString() });
    }
});

router.delete('/borrar/:id', (req, res) => {
    const id = getIdFromRequestParams(req);
    if (!id) return;

    carrito.borrar(id);

    res.status(204).send();
});

module.exports = router;