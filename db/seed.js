const db = require('APP/db');
const categories = require('./categories');

const seedUsers = () => db.Promise.map([
  {name: 'Barack Obama', email: 'barack@example.gov', password: '123456'}
], user => db.model('users').create(user));

const restaurantCategories = categories.filter(category => category.parents.includes('restaurants'));

const seedCategories = () => db.Promise.map(restaurantCategories, category => db.model('categories').create(category));

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .then(seedCategories)
  .then(categories => console.log(`Seeded ${categories.length} categories OK`))
  .catch(error => console.error(error))    
  .finally(() => db.close());
