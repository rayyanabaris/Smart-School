const router = require("express").Router();

const {
  getRoutePickupPointList,
  createRoutePickupPoint,
  updateRoutePickupPoint,
  deleteRoutePickupPoint,
  getRoutePickupPointById,
  getSearchRoutePickupPoint,

} = require("../../controller/Transport/RoutePickupPointCtrl");

router.get("/get", getRoutePickupPointList);
router.get("/get/:id", getRoutePickupPointById);
router.post("/create", createRoutePickupPoint);
router.put("/update/:id", updateRoutePickupPoint);
router.delete("/delete/:id", deleteRoutePickupPoint);
router.get("/search/:key", getSearchRoutePickupPoint);

module.exports = router;
