var mongoose = require('./config/database'),
    User     = require('./models/user'),
    faker    = require('faker');

var users = [];
var records = [];

for (var i=1; i<=5; i++){
  records = [];
  var user = {
    email:         faker.internet.email(),
    password:      '12345',
    likes:         0,
    records:       makeRecords()
  }
  users.push(user)
};

function makeRecords() {
  for (var i=1; i<=5; i++) {
    var record = {
      artist:      faker.commerce.productName(),
      album:       faker.commerce.productAdjective(),
      genre:       '',
      year:        '',
      images:      [],
      label:       '',
      condition:   faker.lorem.sentence(),
      description: faker.lorem.sentences(),
      price:       faker.finance.amount()
    }
    records.push(record);
  }
  return records;
}


User.remove({}, function(error) {
  if(error) console.log(error);
  User.create(users, function(error) {
    if(error) {
      console.log(error);
    } else {
      console.log(`Database seeded with ${users.length} users`);
    }
    mongoose.disconnect();
  });
})
