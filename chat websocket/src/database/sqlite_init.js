const knex = require('knex')
const sqlite_options = {
    client: 'sqlite3',
    connection: {
        filename: "./src/database/ecommerce.sqlite"
    },
    useNullAsDefault: true
}

const sqliteDB = knex(sqlite_options)


// INICIALIZACION DEL PROCESO.
async function main(){

    console.log('proceso para iniciar base de datos SQLITE3 ...')
   
    await createTable()

    console.log('proceso finalizado...')
}

main()




//crear tabla mensajes.
async function createTable(){
    
    try {
        await sqliteDB.schema.dropTableIfExists("mensajes")
        await sqliteDB.schema.createTable("mensajes", function(table){
            table.increments("id");
            table.string("email");
            table.string("message");
            table.datetime("created_at");
        })
        .then(
            console.log('Tabla mensajes creada')
        )
        sqliteDB.destroy()
    } catch (error) {
        console.log(error)
    }    
}    


