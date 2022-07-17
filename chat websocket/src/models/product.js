const knex = require('knex')

class Product {

    dbOptions = {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: '',
            database: 'coder_ecommerce'
        },
        pool: { min: 0, max: 7 }
    }

    table = 'productos';
    database;

    constructor() {
        this.database = knex(this.dbOptions)
    }

    async getAll() {
        return await this.database.select().from(this.table)
    }

    async saveProduct(product) {

        try {
            await this.database(this.table).insert(product)
            return {
                code: 200,
                message: 'Producto guardado'
            }

        } catch (error) {
            return {
                code: 400,
                message: error
            }
        }
    }


}

module.exports = Product