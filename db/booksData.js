let booksData = [
  {
    title: "The School of Life",
    author: "Alain de Botton",
    price: 120000,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1631377503l/58973006._SY475_.jpg",
    CategoryId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    stock: 5,
  },
  {
    title: "Good to Great",
    author: "Jim Collins",
    price: 220000,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1546097703l/76865.jpg",
    CategoryId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    stock: 50,
  },
  {
    title: "East of Eden",
    author: "John Steinback",
    price: 90000,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1639969375l/4406.jpg",
    CategoryId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    stock: 5,
  },
  {
    title: "The Practice",
    author: "Seth Godin",
    price: 190000,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1598245238l/53479927.jpg",
    CategoryId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    stock: 50,
  },
  {
    title: "The Cartoon Introduction to Economics",
    author: "Grady Klein",
    price: 450000,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1416448134l/7333109.jpg",
    CategoryId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
    stock: 50,
  },
  {
    title: "Problem Solving 101",
    author: "Ken Watanabe",
    price: 320000,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1347726846l/6271219.jpg",
    CategoryId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
    stock: 50,
  },
  {
    title: "The Obstacle is The Way",
    author: "Ryan Holiday",
    price: 160000,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1391440316l/18668059.jpg",
    CategoryId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    stock: 2,
  },
  {
    title: "Marketing",
    author: "Brian Tracy",
    price: 70000,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1392028225l/19148225.jpg",
    CategoryId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    stock: 2,
  },
  {
    title: "Cerpen Pilihan Kompas 2014",
    author: "PENERBIT KOMPAS",
    price: 60000,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1563511500l/35475838._SY475_.jpg",
    CategoryId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    stock: 50,
  },
  {
    title: "Cerpen Pilihan Kompas 2015",
    author: "PENERBIT KOMPAS",
    price: 80000,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1464769336l/30328943._SX318_.jpg",
    CategoryId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    stock: 50,
  },
  {
    title: "Rework",
    author: "Jason Fried",
    price: 110000,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1391275636l/6732019.jpg",
    CategoryId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    stock: 50,
  },
  {
    title: "Mastery",
    author: "Robert Greene",
    price: 350000,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348274726l/13589182.jpg",
    CategoryId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    stock: 50,
  },
  {
    title: "The Icarus Deception",
    author: "Seth Godin",
    price: 120000,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1355795227l/15843041.jpg",
    CategoryId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    stock: 50,
  },
  {
    title: "The Daily Stoic",
    author: "Ryan Holiday",
    price: 90000,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1462161080l/29093292.jpg",
    CategoryId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    stock: 50,
  },
  {
    title: "Zero To One",
    author: "Peter Thiel",
    price: 290000,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1630663027l/18050143.jpg",
    CategoryId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    stock: 50,
  },
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    price: 90000,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1629999184l/10127019._SY475_.jpg",
    CategoryId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    stock: 50,
  },
  {
    title: "All Marketers Are Liars",
    author: "Seth Godin",
    price: 150000,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1420382656l/160830.jpg",
    CategoryId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    stock: 50,
  },
  {
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    price: 190000,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1598011736l/54898389._SY475_.jpg",
    CategoryId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    stock: 50,
  },
  {
    title: "Ego Is The Enemy",
    author: "Ryan Holiday",
    price: 220000,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1459114043l/27036528.jpg",
    CategoryId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    stock: 50,
  },
  {
    title: "This is Marketing",
    author: "Seth Godin",
    price: 160000,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1529247040l/40549476._SX318_.jpg",
    CategoryId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    stock: 50,
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    price: 390000,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1535115320l/40121378._SY475_.jpg",
    CategoryId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    stock: 50,
  },
  {
    title: "The Dip",
    author: "Seth Godin",
    price: 130000,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1311282216l/324748.jpg",
    CategoryId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    stock: 50,
  },
  {
    title: "Purple Cow",
    author: "Seth Godin",
    price: 140000,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1309203098l/641604.jpg",
    CategoryId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    stock: 50,
  },
  {
    title: "The Infinite Game",
    author: "Simon Sinek",
    price: 250000,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1571114448l/38390751.jpg",
    CategoryId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    stock: 50,
  },
  {
    title: "Senja dan Cinta yang Berdarah",
    author: "Seno Gumira",
    price: 180000,
    imageUrl:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1409371914l/23125037.jpg",
    CategoryId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    stock: 50,
  },
];

module.exports = booksData;
