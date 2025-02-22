const Sequelize = require("sequelize");
const db = require("./database");

module.exports = db.define("subway", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      "https://us.123rf.com/450wm/sanek13744/sanek137441809/sanek13744180900382/109466074-stock-vector-school-building-icon-in-flat-style-college-education-vector-illustration-on-white-isolated-backgroun.jpg?ver=6",
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  totalTime: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  totalTimeDelayed: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});
