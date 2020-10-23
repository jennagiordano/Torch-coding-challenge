const router = require("express").Router();
const Campus = require("../db/campus");

// GET /api/campus
router.get("/", async (req, res, next) => {
  try {
    const campuses = await Campus.findAll({});
    res.send(campuses);
  } catch (error) {
    next(error);
  }
});

// GET /api/campus/:campusId
router.get("/:campusId", async (req, res, next) => {
  try {
    const singleCampus = await Campus.findOne({
      where: {
        id: req.params.campusId,
      },
    });
    res.send(singleCampus);
  } catch (error) {
    next(error);
  }
});

// POST /api/campus
router.post("/", async (req, res, next) => {
  try {
    const campus = await Campus.create(req.body);
    res.json(campus);
  } catch (err) {
    next(err);
  }
});

// PUT /api/campus/:campusId
router.put("/:campusId", (req, res, next) => {
  Campus.findOne({
    where: {
      id: req.params.campusId,
    },
  })
    .then((campus) => campus.update(req.body))
    .then((campus) => res.json(campus))
    .catch(next);
});

// DELETE /api/campus
router.delete("/:campusId", async (req, res, next) => {
  try {
    const id = req.params.campusId;
    await Campus.destroy({ where: { id } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
