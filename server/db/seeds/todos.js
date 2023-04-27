/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('todos').del()
  await knex('todos').insert([
    { id: 1, description: 'test todo1', status: 'todo' },
    { id: 2, description: 'test todo2', status: 'completed' },
    { id: 3, description: 'test todo3', status: 'todo' },
    { id: 4, description: 'test todo4', status: 'todo' },
    { id: 5, description: 'test todo5', status: 'completed' },
    { id: 6, description: 'test todo6', status: 'completed' },
  ])
}
