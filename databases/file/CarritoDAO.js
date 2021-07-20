const utils = require('../utils');

class Carrito {
    #nombreArchivo = 'carrito.json';
    items = [];
    constructor() {
        if (!utils.existeArchivo(this.#nombreArchivo)) {
            this.#persistir();
        }
        this.items = this.#leer();
    }

    listar() {
        this.items = this.#leer();
        return this.items;
    }

    obtenerPorId(id) {
        if (typeof id !== 'number') throw new Error("El id no es valido");
        const item = this.listar().find(item => {
            return item.id === id;
        });
        return item;
    }

    agregar(producto, cantidad) {
        if (typeof producto !== 'object' || !producto.id) {
            throw Error("El producto no es correcto");
        }
        if (typeof cantidad !== 'number') {
            throw Error("La cantidad no es correcta");
        }

        const id = Date.now();
        const timestamp = utils.calcularTimestamp();
        this.items.push({ producto, cantidad, timestamp, id });
        this.#persistir();

        return this.obtenerPorId(id);
    }

    borrar(id) {
        const pos = this.listar().findIndex(item => item.id === id);
        if (pos !== -1) {
            this.items.splice(pos, 1);
            this.#persistir();
        } else {
            throw Error(`No existe el item con id ${id} en el carrito`);
        }
    }

    #persistir() {
        utils.guardarArchivo(this.#nombreArchivo, JSON.stringify(this.items));
    }

    #leer() {
        return JSON.parse(utils.leerArchivo(this.#nombreArchivo));
    }
}


module.exports = new Carrito();