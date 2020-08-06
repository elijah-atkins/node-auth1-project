
exports.seed = function(knex) {
      return knex('users').insert([
        {username: 'Paul', password: 'password'},
        {username: 'John', password: 'password'},
        {username: 'George', password: 'password'},
        {username: 'Ringo', password: 'password'},
        {username: 'Frodo', password: 'password'},
        {username: 'Gandolf', password: 'you shall not password'},
      ]);
};
