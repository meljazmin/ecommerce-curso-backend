const Roles = require('../model/Roles');
const Utils = require('../utils');

const users = [
    {
        username: 'melanie',
        passwordHash: '25d55ad283aa400af464c76d713c07ad',
        rol: Roles.ADMIN
    },
    {
        username: 'brian',
        passwordHash: '25d55ad283aa400af464c76d713c07ad',
        rol: Roles.USER
    }
];

const adminEndpoints = [
    '/productos/agregar',
    '/productos/actualizar',
    '/productos/borrar'
];

const getUser = (req) => {
    if (!Object.keys(req.headers).includes('authorization')) throw Error('Request sin header authorization');
    const authorizationValue = req.headers.authorization;

    const userpassb64 = authorizationValue.split(' ')[1];

    const userpassStr = Buffer.from(userpassb64, 'base64').toString('utf-8');

    const userpassArr = userpassStr.split(':');

    let user = users.find(u => u.username === userpassArr[0]);

    if (user.passwordHash !== Utils.hashMD5(userpassArr[1])) {
        throw Error('La constraseña no es correcta');
    }

    return Object.freeze(user);
}

module.exports = (req, res, next) => {
    try {
        const user = getUser(req);

        adminEndpoints.forEach(endpoint => {
            if (req.path.includes(endpoint)) {
                if (user.rol !== Roles.ADMIN) {
                    throw Error(`El endpoint ${req.path} es solo para administradores`);
                }
            }
        });

        next();
    } catch (e) {
        console.error("Ocurrio un error: ", e.toString());
        res.status(401).send({
            error: -1,
            descripcion: e.toString()
        });
    }
}