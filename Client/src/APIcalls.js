const getTotalLikes = (arr) =>
  Object.values(
    arr.reduce((acc, { username, likes }) => {
      acc[username] =
        username in acc
          ? { username, totalLikes: acc[username].totalLikes + likes.length }
          : { username, totalLikes: likes.length };
      return acc;
    }, {})
  );

const articles = [
  {
    authorId: "2vP3i2rYvDYPrikE1k1DTaZDeoq1",
    dislikes: 0,
    likes: [1, 2, 4, 8, 9],
    neutral: 0,
    text: "This is Mike Alice's first Shot!!",
    username: "mikealice",
    id: "NMFGbeTvSYddsr7VzjFV",
  },
  {
    authorId: "2vP3i2rYvDYPrikE1k1DTaZDeoq1",
    dislikes: 0,
    likes: [6, 7, 3, 8, 9, 1, 9],
    neutral: 0,
    text: "This is Mike Alice's second Shot!!",
    username: "mikealice",
    id: "NMFGbeTvSYddsr7VzjFV",
  },
  {
    authorId: "2vP3i2rYvDYPrikE1k1klkDTaZDeoq1",
    dislikes: 0,
    likes: [1, 2, 4, 8, 9],
    neutral: 0,
    text: "This is admin's first Shot!!",
    username: "admin",
    id: "NMFGbeTvSYddsr7VzjFV",
  },
  {
    authorId: "2vP3i2rYvDYPrikE1k1klkDTaZDeoq1",
    dislikes: 0,
    likes: [9, 11, 2, , 6, 4, 8, 9],
    neutral: 0,
    text: "This is admin's second Shot!!",
    username: "admin",
    id: "NMFGbeTvSYddsr7VzjFV",
  },
];

console.log(getTotalLikes(articles));

const people = [
  { id: 1, name: "John" },
  { id: 2, name: "Alice" },
];
const address = [
  { id: 1, peopleId: 1, address: "Some street 1" },
  { id: 2, peopleId: 2, address: "Some street 2" },
];

let op = people.map((e, i) => {
  let temp = address.find((element) => element.id === e.id);
  if (temp.address) {
    e.address = temp.address;
  }
  return e;
});
console.log(op);
