const db = require('APP/db');

const seedUsers = () => db.Promise.map([
  {name: 'so many', email: 'god@example.com', password: '123456'},
  {name: 'Barack Obama', email: 'barack@example.gov', password: '123456'},
], user => db.model('users').create(user));


const seedCategories = () => db.Promise.map([
  {title:'bars'},
  {title:'burgers'},
  {title:'buffets'},
  {title:'chinese'},
  {title:'cafe'},  
  {title:'deli'},
  {title:'french'},
  {title:'indpak'},
  {title:'italian'},
  {title:'japanese'},
  {title:'kebab'},
  {title:'korean'},
  {title:'mexican'},
  {title:'newamerican'},
  {title:'pizza'},
  {title:'salad'},   
  {title:'seafood'},     
  {title:'spanish'},
  {title:'sushi'},
  {title:'thai'},
  {title:'vietnamese'},
], category => db.model('categories').create(category));

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .then(seedCategories)
  .then(categories => console.log(`Seeded ${categories.length} categories OK`))
  .catch(error => console.error(error))    
  .finally(() => db.close());
