import knex from 'knex';
import knexConfig from '../../knexfile';

export const sqliteDB = knex({
  client: 'sqlite3',
  connection: { filename: './db.sqlite'}
});

export const mysqlDB = knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'prueba'
  },
  pool: { min: 0, max: 7 }
});

class DB {

  connection: any;

  constructor() {
    console.log('SETTING development DB');
    const options = knexConfig['development'];
    this.connection = knex(options);
  }

  init() {
    
    this.connection.schema.hasTable('productos').then((exists: any) => {
      if (exists) return;
      console.log('Creamos la tabla productos!');

      return this.connection.schema.createTable(
        'productos',
        (productosTable: { increments: () => void; string: (arg0: string) => { (): any; new(): any; notNullable: { (): void; new(): any; }; }; integer: (arg0: string) => { (): any; new(): any; notNullable: { (): void; new(): any; }; }; decimal: (arg0: string, arg1: number, arg2: number) => void; timestamp: (arg0: string) => { (): any; new(): any; defaultTo: { (arg0: Date): void; new(): any; }; }; }) => {
          productosTable.increments();
          productosTable.string('title').notNullable();
          productosTable.string('description').notNullable();
          productosTable.integer('stock').notNullable();
          productosTable.decimal('price', 4, 2);
          productosTable.timestamp('createdAt').defaultTo(new Date());
        }
      );
    });
  }

    getAll(tableName: string) {
      return this.connection(tableName);
    }

    get(tableName: string, id: Number) {
      if (id) return this.connection(tableName).where('id', id);
  
      return this.connection(tableName);
    }
  
    create(tableName: any, data: any) {
      return this.connection(tableName).insert(data);
    }
  
    update(tableName: any, id: any, data: any) {
      return this.connection(tableName).where('id', id).update(data);
    }
  
    delete(tableName: any, id: any) {
      return this.connection(tableName).where('id', id).del();
    }
}

export const DBService = new DB();