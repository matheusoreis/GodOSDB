import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('actors', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('sprite').notNullable();
    table.integer('directionX').notNullable();
    table.integer('directionY').notNullable();
    table.integer('positionX').notNullable();
    table.integer('positionY').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('actors');
}
