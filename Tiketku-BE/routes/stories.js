const router = require("express").Router();

// controller
const Stories = require("../controller/storiesController");

// middleware
// const Uploader = require("../middlewares/uploaders");
const Authentication = require("../middlewares/authenticate");

// API
router.post("/create-stories", Authentication, Stories.createStories);
router.get("/:id", Stories.getStoriesById);
// router.get("/", ForYous.getAllForYous);
// router.put("/:id", ForYous.updateForYous);
router.delete("/:id", Stories.deleteStories);
// router.get("/search/:name", ForYous.getForYousByName);
// router.get("/search/:depart/:arrive", flightController.getFlightByAirport);

module.exports = router;
