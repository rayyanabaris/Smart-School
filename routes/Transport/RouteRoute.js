const router = require("express").Router();

const {
  getRouteList,
  createRoute,
  updateRoute,
  deleteRoute,
  getRouteById,
  getSearchRoute,

} = require("../../controller/Transport/RouteCtrl");

router.get("/get", getRouteList);
router.get("/get/:id", getRouteById);
router.post("/create", createRoute);
router.put("/update/:id", updateRoute);
router.delete("/delete/:id", deleteRoute);
router.get("/search/:key", getSearchRoute);

module.exports = router;
