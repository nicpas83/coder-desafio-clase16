const knex = require('knex')

class ContenedorMysql {

    database;
    table;
    constructor(dbOptions, table) {
        this.database = knex(dbOptions)
        this.table = table
    }

    async createTable() {
        try {
            await this.database.schema.dropTableIfExists(this.table);

            await this.database.schema.createTable(this.table, (table) => {
                table.increments('id').primary();
                table.string('titulo', 50).notNullable();
                table.integer('precio');
            })
            console.log(`Tabla ${this.table} creada`)

        } catch (error) {
            console.log(error)
        } 
    }

    //title, price
    async insertProduct(data) {
        try {
            console.log(this.table)
            
            await this.database('productos').insert(data)
            console.log(`El producto fue agregado`)
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id) {
        try {
            const data = await this.database.from(this.table).select('*').where("id", id)
            console.log(data)
            return data;
          } catch (e) {
            console.log(e);
            this.database.destroy()
          }
    }

    async getAll() {
        try {
            const data = await this.database.from(this.table).select('*')
            console.log(data)
            return data;
          } catch (e) {
            console.log(e);
            this.database.destroy()
          }
    }

    async deleteById(id) {
        try {
            await database.from(this.table).where('id', '=', id).del()
            console.log('Producto eliminado!')
            database.destroy()
          } catch (e) {
            console.log(e);
            database.destroy()
          }
    }

    async deleteAll() {
        try {
            await this.database.from(this.table).del()
            console.log('Todos los productos fueron eliminado!')
            database.destroy()
          } catch (e) {
            console.log(e);
            database.destroy()
          }
    }


}


const dbOptions = {
    client: 'sqlite3',
    connection: {
      filename: './DB/mydb.sqlite'
    },
    useNullAsDefault: true
}

const table = 'productos';

//TEST CLASE

const objContenedor = new ContenedorMysql(dbOptions, table)

// objContenedor.createTable()


// INSERTO NUEVO PRODUCTO
const product = {
    titulo: 'Tablet Lenovo',
    precio: 6500
}
objContenedor.insertProduct(product)


//TRAIGO PRODUCTO ID 1
// objContenedor.getById(1)

