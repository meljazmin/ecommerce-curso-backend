const fs = require('fs');
const path = require('path');
const os = require('os');
const moment = require('moment');
const crypto = require('crypto');

const FILES_PATH = process.env.DEFAULT_FILE_PATH || path.join(os.tmpdir(), 'ecommerce');

module.exports = {
    validarCampo: (valor, tipo, mensajeError, validacionExtra) => {
        if (typeof valor !== tipo) {
            if (validacionExtra) {
                if (validacionExtra(valor)) {
                    throw Error(mensajeError);
                }
            } else {
                throw Error(mensajeError);
            }
        }
    },
    guardarArchivo: (nombreArchivo, contenido) => {
        if (!fs.existsSync(FILES_PATH)) {
            fs.mkdirSync(FILES_PATH);
        }
        fs.writeFileSync(path.join(FILES_PATH, nombreArchivo), contenido);
    },
    leerArchivo: (nombreArchivo) => {
        return fs.readFileSync(path.join(FILES_PATH, nombreArchivo), {
            encoding: 'utf-8'
        });
    },
    existeArchivo: (nombreArchivo) => {
        return fs.existsSync(path.join(FILES_PATH, nombreArchivo));
    },
    calcularTimestamp: ()=>{
        return moment().format('YYYYmmDDHHMMSS');
    },
    hashMD5: (value)=>{
        return crypto.createHash('md5').update(value).digest("hex");
    }
}