const express = require('express');
const productos = require('../controllers/productos');

const productosRouter = express.Router();

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

productosRouter.get('/listar', async (req, res, next) => {
    try {
        const productosLista = await productos.listar();
        if (productosLista.length === 0) {
            res.status(404).send({ error: 'no hay productos cargados' });
        } else {
            res.send(productosLista);
        }
    } catch (e) {
        next(e);
    }
});

productosRouter.get('/listar/:id', async (req, res, next) => {
    try {
        const id = getIdFromRequestParams(req);
        if (!id) return;

        const producto = await productos.obtenerPorId(id);
        if (!producto) {
            res.status(404).send({ error: 'producto no encontrado' });
        } else {
            res.send(producto);
        }
    } catch (e) {
        next(e);
    }
});

productosRouter.post('/agregar', async (req, res, next) => {
    try {
        let { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        const productoCreado = await productos.agregarProducto(nombre, descripcion, codigo, foto, precio, stock);
        res.status(201).send(productoCreado);
    } catch (e) {
        next(e);
    }
});


productosRouter.put('/actualizar/:id', async (req, res, next) => {
    try {
        // const { title, price, thumbnail } = req.body;
        const id = getIdFromRequestParams(req);
        if (!id) return;

        const producto = await productos.actualizarProducto(id, req.body);

        res.send(producto);
    } catch (e) {
        next(e);
    }
});


productosRouter.delete('/borrar/:id', async (req, res, next) => {
    try {
        const id = getIdFromRequestParams(req);
        if (!id) return;

        await productos.borrarProducto(id);

        res.status(204).send();
    } catch (e) {
        next(e);
    }
});

module.exports = productosRouter;