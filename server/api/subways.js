const router = require("express").Router();
const Subway = require("../db/subway");

// GET /api/subway
router.get("/", async (req, res, next) => {
  try {
    const subways = await Subway.findAll({});
    res.send(subways);
  } catch (error) {
    next(error);
  }
});

// GET /api/subway/:name
router.get("/:name", async (req, res, next) => {
  try {
    const singleSubway = await Subway.findOne({
      where: {
        name: req.params.name,
      },
    });
    res.send(singleSubway);
  } catch (error) {
    next(error);
  }
});

// POST /api/subway
router.post("/", async (req, res, next) => {
  try {
    const subway = await Subway.create(req.body);
    res.json(subway);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
