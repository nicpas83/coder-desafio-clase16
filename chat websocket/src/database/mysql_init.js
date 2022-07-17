const knex = require('knex')
const mysql_options = {
    client: 'mysql',
        connection: {
            host: '127.0.0.1',
            port : 3306,
            user: 'root',
            password: '',
            database: 'coder_ecommerce'
        },
        pool: { min: 0, max: 7 }
}
const mysqlDB = knex(mysql_options)



// INICIALIZACION DEL PROCESO.
async function main(){
    console.log('proceso para iniciar base de datos MYSQL...')
    await dropDB()
    await createDB()
    await createTable()

    console.log('proceso finalizado...')
}

main()



//MYSQL
// eliminar si existe.
const dropDB = async () => {
    try {
        await mysqlDB.raw('DROP DATABASE IF EXISTS coder_ecommerce');
        console.log('Base de datos eliminada')
    } catch (error) {
        console.log(error)
    }
}

// crear base de datos ecommerce
const createDB = async () => {
    try {
        await mysqlDB.raw('CREATE DATABASE coder_ecommerce CHARACTER SET utf8');
        console.log('Base de datos creada')      
    } catch (error) {
        console.log(error)
    }
}

//crear tabla productos.
const createTable = async () => {
    const mysqlDB = knex(mysql_options)
    try {
        await mysqlDB.schema.dropTableIfExists("productos")
        await mysqlDB.schema.createTable("productos", function(table){
            table.increments("id");
            table.string("title");
            table.integer("price");
            table.string("thumbnail");
        })
        .then(
            console.log('Tabla productos creada')
        )
        mysqlDB.destroy()
    } catch (error) {
        console.log(error)
    }    
}    


