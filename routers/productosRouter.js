const express = require('express');
const productos = require('../api/productos');

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

    return Number(id);
}

productosRouter.get('/listar', (req, res) => {
    const productosLista = productos.listar();
    if (productosLista.length === 0) {
        res.status(404).send({ error: 'no hay productos cargados' });
    } else {
        res.send(productosLista);
    }
});

productosRouter.get('/listar/:id', (req, res) => {
    const id = getIdFromRequestParams(req);
    if (!id) return;

    const producto = productos.obtenerPorId(id);
    if (!producto) {
        res.status(404).send({ error: 'producto no encontrado' });
    } else {
        res.send(producto);
    }
});

productosRouter.post('/agregar', (req, res) => {
    let { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const productoCreado = productos.agregarProducto(nombre, descripcion, codigo, foto, precio, stock);
    res.status(201).send(productoCreado);
});


productosRouter.put('/actualizar/:id', (req, res) => {
    // const { title, price, thumbnail } = req.body;
    const id = getIdFromRequestParams(req);
    if (!id) return;

    const producto = productos.actualizarProducto(id, req.body);

    res.send(producto);
});


productosRouter.delete('/borrar/:id', (req, res) => {
    const id = getIdFromRequestParams(req);
    if (!id) return;

    productos.borrarProducto(id);

    res.status(204).send();
});

module.exports = productosRouter;