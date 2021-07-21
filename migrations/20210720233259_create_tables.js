exports.up = function (knex) {
    return knex.schema.dropTableIfExists('productos').createTable('productos', function (table) {
        table.increments('id');
        table.string('nombre').notNullable();
        table.string('descripcion').notNullable();
        table.string('codigo').notNullable();
        table.string('foto').notNullable();
        table.float('precio').notNullable();
        table.float('stock').notNullable();
        table.datetime('timestamp').notNullable().defaultTo(knex.fn.now());
    }).dropTableIfExists('carrito').createTable('carrito', function (table) {
        table.increments('id');
        table.integer('producto_id').unsigned().notNullable();
        table.integer('cantidad').unsigned().notNullable().defaultTo(0);
        table.datetime('timestamp').notNullable().defaultTo(knex.fn.now());
        
        table.foreign('producto_id').references('id').inTable('productos').onDelete('CASCADE').onUpdate('NO ACTION');
    });
}

exports.down = function (knex) {
    return knex.schema.dropTable('carrito').dropTable('productos');
}