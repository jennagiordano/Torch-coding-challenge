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

// GET /api/subway/:subwayId
router.get("/:subwayId", async (req, res, next) => {
  try {
    const singleSubway = await Subway.findOne({
      where: {
        id: req.params.subwayId,
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

// PUT /api/subway/:subwayId
router.put("/:subwayId", (req, res, next) => {
  Subway.findOne({
    where: {
      id: req.params.subwayId,
    },
  })
    .then((subway) => subway.update(req.body))
    .then((subway) => res.json(subway))
    .catch(next);
});

// DELETE /api/subway
router.delete("/:subwayId", async (req, res, next) => {
  try {
    const id = req.params.subwayId;
    await Subway.destroy({ where: { id } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
