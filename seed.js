const { green, red } = require("chalk");
const { db, Subway } = require("./server/db/index");

const subways = [
  {
    id: 1,
    name: "1",
    status: "ON TIME",
    totalTime: 100,
    totalTimeDelayed: 50,
  },
  {
    id: 2,
    name: "2",
    status: "ON TIME",
    totalTime: 350,
    totalTimeDelayed: 50,
  },
  {
    id: 3,
    name: "3",
    status: "DELAYED",
    totalTime: 400,
    totalTimeDelayed: 200,
  },
  {
    id: 4,
    name: "4",
    status: "DELAYED",
    totalTime: 500,
    totalTimeDelayed: 50,
  },
  {
    id: 5,
    name: "5",
    status: "ON TIME",
    totalTime: 300,
    totalTimeDelayed: 100,
  },
  {
    id: 6,
    name: "6",
    status: "DELAYED",
    totalTime: 200,
    totalTimeDelayed: 50,
  },
  {
    id: 7,
    name: "7",
    status: "ON TIME",
    totalTime: 300,
    totalTimeDelayed: 120,
  },
  {
    id: 8,
    name: "A",
    status: "ON TIME",
    totalTime: 340,
    totalTimeDelayed: 120,
  },
  {
    id: 9,
    name: "C",
    status: "DELAYED",
    totalTime: 500,
    totalTimeDelayed: 400,
  },
  {
    id: 10,
    name: "E",
    status: "ON TIME",
    totalTime: 130,
    totalTimeDelayed: 40,
  },
  {
    id: 11,
    name: "B",
    status: "DELAYED",
    totalTime: 220,
    totalTimeDelayed: 80,
  },
  {
    id: 12,
    name: "D",
    status: "DELAYED",
    totalTime: 400,
    totalTimeDelayed: 230,
  },
  {
    id: 13,
    name: "F",
    status: "ON TIME",
    totalTime: 500,
    totalTimeDelayed: 250,
  },
  {
    id: 14,
    name: "M",
    status: "DELAYED",
    totalTime: 310,
    totalTimeDelayed: 130,
  },
  {
    id: 15,
    name: "G",
    status: "DELAYED",
    totalTime: 200,
    totalTimeDelayed: 45,
  },
  {
    id: 16,
    name: "J Z",
    status: "ON TIME",
    totalTime: 650,
    totalTimeDelayed: 500,
  },
  {
    id: 17,
    name: "N",
    status: "ON TIME",
    totalTime: 425,
    totalTimeDelayed: 225,
  },
  {
    id: 18,
    name: "Q",
    status: "DELAYED",
    totalTime: 360,
    totalTimeDelayed: 180,
  },
  {
    id: 19,
    name: "R",
    status: "ON TIME",
    totalTime: 430,
    totalTimeDelayed: 210,
  },
  {
    id: 20,
    name: "W",
    status: "DELAYED",
    totalTime: 525,
    totalTimeDelayed: 400,
  },
  {
    id: 21,
    name: "L",
    status: "ON TIME",
    totalTime: 150,
    totalTimeDelayed: 60,
  },
  {
    id: 22,
    name: "42 Street Shuttle",
    status: "ON TIME",
    totalTime: 210,
    totalTimeDelayed: 100,
  },
  {
    id: 23,
    name: "Rockaway Park Shuttle",
    status: "DELAYED",
    totalTime: 375,
    totalTimeDelayed: 300,
  },
  {
    id: 24,
    name: "Franklin Av Shuttle",
    status: "ON TIME",
    totalTime: 120,
    totalTimeDelayed: 80,
  },
  {
    id: 25,
    name: "Staten Island Railway",
    status: "DELAYED",
    totalTime: 220,
    totalTimeDelayed: 180,
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(
      subways.map((subway) => {
        return Subway.create(subway);
      })
    );
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green("Seeding success!"));
      db.close();
    })
    .catch((err) => {
      console.error(red("Oh noes! Something went wrong!"));
      console.error(err);
      db.close();
    });
}
