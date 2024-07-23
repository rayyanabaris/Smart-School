const router = require("express").Router();

const {
  getPickupPointList,
  createPickupPoint,
  updatePickupPoint,
  deletePickupPoint,
  getPickupPointById,
  getSearchPickupPoint,

} = require("../../controller/Transport/PickupPointCtrl");

router.get("/get", getPickupPointList);
router.get("/get/:id", getPickupPointById);
router.post("/create", createPickupPoint);
router.put("/update/:id", updatePickupPoint);
router.delete("/delete/:id", deletePickupPoint);
router.get("/search/:key", getSearchPickupPoint);

module.exports = router;
