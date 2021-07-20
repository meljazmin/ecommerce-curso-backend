module.exports = {
    DATABASE_CONFIG: {
        SELECTED: 3,
        config: {
            1: {
                url: 'mongodb://localhost/ecommerce',
                options: {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }
            },
            2: {
                url: 'mongodb://localhost/ecommerce',
                options: {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }
            },
            3: {
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