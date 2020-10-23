const { green, red } = require("chalk");
const { db, Subway } = require("./server/db/index");
const { getMaxListeners } = require("./server");

const subways = [
  {
    id: 1,
    name: "Mars Academy",
    address: "181 Mars Rd, MA, Mars 10191",
    imageUrl: "/images/mars.png",
  },
  {
    id: 2,
    name: "Jupiter Jumpstart",
    address: "222 Jupiter Lane, JU, Jupiter 20202",
    imageUrl: "/images/jupiter.jpeg",
  },
  {
    id: 3,
    name: "Saturn Starters",
    address: "344 Saturn Ave, SA, Saturn 33221",
    imageUrl: "/images/saturn.jpeg",
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
