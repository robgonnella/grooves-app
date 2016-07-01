var mongoose = require('./config/database'),
    User     = require('./models/user');

var records = [
  {
    artist:        "Prince",
    album:         "Purple Rain",
    genre:         '',
    year:          '1984',
    images:        [],
    current_image: "./assets/ppr2.jpg"
    label:         '',
    condition:     faker.lorem.sentence(),
    description:   "RIP",
    price:         25
  },
  {
    artist:        "Miles Davis",
    album:         "Bitches Brew",
    genre:         '',
    year:          '1972',
    images:        [],
    current_image: "./assets/miles.jpg"
    label:         '',
    condition:     faker.lorem.sentence(),
    description:   "RIP",
    price:         25
  },
  {
    artist:        "David Bowie",
    album:         "Ziggy Stardust",
    genre:         '',
    year:          '1972',
    images:        [],
    current_image: "./assets/zs.jpg"
    label:         '',
    condition:     faker.lorem.sentence(),
    description:   "RIP",
    price:         25
  },
  {
    artist:        "Jimi Hendrix",
    album:         "Band of Gypses",
    genre:         '',
    year:          '1970',
    images:        [],
    current_image: "./assets/jimi.jpg"
    label:         '',
    condition:     faker.lorem.sentence(),
    description:   "RIP",
    price:         25
  },
  {
    artist:        "Eagles",
    album:         "Hotel California",
    genre:         '',
    year:          '1977',
    images:        [],
    current_image: "./assets/glenfrey.jpg"
    label:         '',
    condition:     faker.lorem.sentence(),
    description:   "RIP",
    price:         25
  },
  {
    artist:        "Motörhead",
    album:         "Ace of Spades",
    genre:         '',
    year:          '1977',
    images:        [],
    current_image: "./assets/mh.jpg"
    label:         '',
    condition:     faker.lorem.sentence(),
    description:   "RIP",
    price:         25
  }
]

var user = {
  email:         "rob@rob.com"
  password:      'abc123',
  likes:         0,
  records:       records
}

User.create(user, function(error) {
  if(error) {
    console.log(error);
  } else {
    console.log(`Database seeded with ${user.email} email and ${user.records.length} records`);
  }
  mongoose.disconnect();
});
