const config = require('../config');

const daoTypes = [
    {
        type: 'MONGOOSE',
        productosDAOPackageName: '../databases/mongoose/ProductosDAO',
        carritoDAOPackageName: '../databases/mongoose/CarritoDAO'
    },
    {
        type: 'KNEX',
        productosDAOPackageName: '../databases/knex/ProductosDAO',
        carritoDAOPackageName: '../databases/knex/CarritoDAO'
    }
];

const databaseConfig = config.DATABASE_CONFIG.config[config.DATABASE_CONFIG.SELECTED],
    daoType = daoTypes.find(d => d.type === databaseConfig.type);
module.exports = {
    getProductosDAO: () => {
        const module = require(daoType.productosDAOPackageName);
        return new module(databaseConfig);
    },
    getCarritoDAO: () => {
        const module = require(daoType.carritoDAOPackageName);
        return new module(databaseConfig);
    }
};