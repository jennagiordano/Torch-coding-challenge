// The purpose of this module is to bring Sequelize instance (`db`) together
// with models

const db = require("./database");
const Subway = require("./subway");

module.exports = {
  db,
  Subway,
};
