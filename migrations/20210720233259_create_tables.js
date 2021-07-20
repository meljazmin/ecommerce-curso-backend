exports.up = function (knex, Promise) {
    return knex.schema.createTable('productos', function (table) {
        table.increments('id');
        table.string('nombre').notNullable();
        table.string('descripcion').notNullable();
        table.string('codigo').notNullable();
        table.string('foto').notNullable();
        table.float('precio').notNullable();
        table.float('stock').notNullable();
        table.date('timestamp').notNullable();
    }).createTable('carrito', function (table) {
        table.increments('id');
        table.integer('producto').unsigned().notNullable();
        table.integer('cantidad').unsigned().notNullable();

        table.foreign('producto').references('id').inTable('productos').onDelete('CASCADE').onUpdate('NO ACTION');
    });
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('carrito').dropTable('productos');
}