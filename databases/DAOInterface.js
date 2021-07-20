class DAOInterface {
    constructor() {
        if (!this.create) throw 'No se ha implementado el metodo create';
        if (!this.read) throw 'No se ha implementado el metodo read';
        if (!this.update) throw 'No se ha implementado el metodo update';
        if (!this.delete) throw 'No se ha implementado el metodo delete';
    }
}

module.exports = DAOInterface;