var mongoose = require('../config/database'),
    User     = require('../models/user'),
    faker    = require('faker');

var users = [];
var records = [];
var images = [
  "./assets/1.png",
  "./assets/2.png",
  "./assets/3.png",
  "./assets/4.png",
  "./assets/5.png",
  "./assets/6.png",
  "./assets/7.png",
  "./assets/8.jpg",
  "./assets/9.jpg",
  "./assets/10.png",
  "./assets/11.png",
  "./assets/12.jpg",
  "./assets/13.jpg",
  "./assets/14.jpg"
];

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
      current_image: images[Math.floor(Math.random() * (14 - 0)) + 0],
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
