/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('tasks').del();
  await knex('tasks').insert([
    { title: 'Learn React', completed: true },
    { title: 'Build a Node.js Backend', completed: true },
    { title: 'Master PostgreSQL', completed: false },
    { title: 'Professional Modular App', completed: false }
  ]);
};
