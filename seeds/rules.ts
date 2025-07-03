import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('rules').del();
  await knex('rules').insert([
    {
      id: 1,
      title: 'Jogador',
    },
    {
      id: 2,
      title: 'Vip',
    },
    {
      id: 3,
      title: 'Moderador',
    },
    {
      id: 4,
      title: 'Desenvolvedor',
    },
    {
      id: 5,
      title: 'Servidor',
    },
  ]);

  await knex.raw(`SELECT setval('rules_id_seq', (SELECT MAX(id) FROM rules))`);
}
