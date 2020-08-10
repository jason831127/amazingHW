var knex = require('knex');

function Database(config) {
  this.db = knex({
    client: 'mysql',
    connection: config,
    pool: { min: 0, max: 10 }
  });
}

module.exports = Database;
