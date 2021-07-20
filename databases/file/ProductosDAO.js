const utils = require('../utils');

class Productos {
    productos = [];

    constructor() {
        if (!utils.existeArchivo('productos.json')) {
            this.#persistir();
        }
        this.productos = this.#leer();        
    }

    listar() {
        this.productos = this.#leer();
        return this.productos;
    }

    obtenerPorId(id) {
        if (typeof id !== 'number') throw new Error("El id no es valido");
        const producto = this.listar().find(producto => {
            return producto.id === id;
        });
        return producto;
    }

    agregarProducto(nombre, descripcion, codigo, foto, precio, stock) {
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

        const id = Date.now();
        const timestamp = utils.calcularTimestamp();
        this.productos.push({ id, timestamp, nombre, descripcion, codigo, foto, precio: parseFloat(precio), stock: parseFloat(stock) });

        this.#persistir();

        return this.obtenerPorId(id);

    }

    actualizarProducto(id, { nombre, descripcion, codigo, foto, precio, stock }) {
        const producto = this.obtenerPorId(id);
        if (!producto) throw new Error(`No existe el producto con id ${id}`);

        producto.nombre = nombre || producto.nombre;
        producto.descripcion = descripcion || producto.descripcion;
        producto.codigo = codigo || producto.codigo;
        producto.foto = foto || producto.foto;
        producto.precio = parseFloat(precio || producto.precio);
        producto.stock = parseFloat(stock || producto.stock);

        this.#persistir();

        return producto;
    }

    borrarProducto(id) {
        const pos = this.productos.findIndex(producto => producto.id === id);
        if (pos !== -1) {
            this.productos.splice(pos, 1);
            this.#persistir();
        } else {
            throw Error(`No existe el producto con id ${id}`);
        }
    }

    #persistir() {
        utils.guardarArchivo('productos.json', JSON.stringify(this.productos));
    }

    #leer() {
        return JSON.parse(utils.leerArchivo('productos.json'));
    }
}


module.exports = new Productos();