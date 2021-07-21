module.exports = {
    DATABASE_CONFIG: {
        SELECTED: 2,
        config: {
            1: {
                type: 'MONGOOSE',
                url: 'mongodb://localhost/ecommerce',
                options: {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }
            },
            2: {
                type: 'MONGOOSE',
                url: 'mongodb+srv://meljazmin:jRyNkpthnWqIxHLe@cluster0.d0tow.mongodb.net/ecommerce?retryWrites=true&w=majority',
                options: {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }
            },
            3: {
                type: 'KNEX',
                client: 'mysql',
                connection: {
                    host: '127.0.0.1',
                    user: 'root',
                    password: '',
                    database: 'ecommerce'
                },
                pool: { min: 0, max: 7 }
            }
        }
    }
}