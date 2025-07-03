import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('actors', (table) => {
    table
      .integer('accountId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('accounts')
      .onDelete('CASCADE');

    table
      .integer('mapId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('maps')
      .onDelete('RESTRICT');

    table
      .integer('ruleId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('rules')
      .onDelete('RESTRICT');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('actors', (table) => {
    table.dropColumn('accountId');
    table.dropColumn('mapId');
    table.dropColumn('ruleId');
  });
}
