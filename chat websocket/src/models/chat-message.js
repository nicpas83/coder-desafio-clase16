const knex = require('knex')

class ChatMessage {

    dbOptions = {
        client: 'sqlite3',
        connection: {
            filename: './src/database/ecommerce.sqlite'
        },
        useNullAsDefault: true
    }

    table = 'mensajes';
    database;

    constructor() {
        this.database = knex(this.dbOptions)
    }

    async save(data) {

        try {
            await this.database(this.table).insert(data)
            return {
                code: 200,
                message: 'Mensaje guardado'
            }
        } catch (error) {
            return {
                code: 400,
                message: error
            }
        }       
    }

    
    async getAll() {
        return this.database(this.table).select()
    }

    
}

module.exports = ChatMessage
