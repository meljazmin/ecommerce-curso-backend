const config = require('../config');

const daoConfigMap = [
    {
        value: 1,
        productosDAOPackageName: '../databases/mongoose/ProductosDAO',
        carritoDAOPackageName: '../databases/mongoose/CarritoDAO'
    },
    {
        value: 2,
        productosDAOPackageName: '../databases/mongoose/ProductosDAO',
        carritoDAOPackageName: '../databases/mongoose/CarritoDAO'
    },
    {
        value: 3,
        productosDAOPackageName: '../databases/knex/ProductosDAO',
        carritoDAOPackageName: '../databases/knex/CarritoDAO'
    }
];

const daoConfig = daoConfigMap.find(d => d.value === config.DATABASE_CONFIG.SELECTED),
    databaseConfig = config.DATABASE_CONFIG.config[config.DATABASE_CONFIG.SELECTED];
module.exports = {
    getProductosDAO: () => {
        const module = require(daoConfig.productosDAOPackageName);
        return new module(databaseConfig);
    },
    getCarritoDAO: () => {
        const module = require(daoConfig.carritoDAOPackageName);
        return new module(databaseConfig);
    }
};