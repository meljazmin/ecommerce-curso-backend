const express = require('express');
const productosRouter = require('./routers/productosRouter');
const carritoRouter = require('./routers/carritoRouter');

const app = express();

const apiRouter = express.Router();

apiRouter.use(express.json());

apiRouter.use('/productos', productosRouter);
apiRouter.use('/carrito', carritoRouter);

app.use('/api', require('./middlewares/auth'), apiRouter);

// Acá se atrapa los requests de recursos no encontrados (404)
app.use((req, res, next) => {
    res.status(404).send({
        status: 404,
        error: `La ruta ${req.path} no ha sido implementada`
    });
});

// Acá se atrapan los errores
app.use((err, req, res, next) => {
    console.error(err);
    if (res.headersSent) {
        return next(err);
    } else {
        res.status(500).send({
            status: 500,
            error: err.toString()
        });
    }
});

// Puerto donde escucha el servidor 
const puerto = process.env.PORT || 8080;

app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});