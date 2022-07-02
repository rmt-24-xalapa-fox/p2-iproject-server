let ordersData = [
  {
    UserId: 1,
    books: [1, 2],
    createdAt: new Date(),
    updatedAt: new Date(),
    price: 400000,
    receivedDateMin: new Date("26 June 2022"),
    receivedDateMax: new Date("28 June 2022"),
    status: "on process",
  },
  {
    UserId: 1,
    books: [3, 4, 5, 6],
    createdAt: new Date(),
    updatedAt: new Date(),
    price: 250000,
    receivedDateMin: new Date("25 June 2022"),
    receivedDateMax: new Date("29 June 2022"),
    status: "on process",
  },
];

module.exports = ordersData;
