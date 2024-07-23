const router = require("express").Router();

const {
  getAssignVehicleList,
  createAssignVehicle,
  updateAssignVehicle,
  deleteAssignVehicle,
  getAssignVehicleById,
  getSearchAssignVehicle,

} = require("../../controller/Transport/AssignVehicleCtrl");

router.get("/get", getAssignVehicleList);
router.get("/get/:id", getAssignVehicleById);
router.post("/add", createAssignVehicle);
router.put("/update/:id", updateAssignVehicle);
router.delete("/delete/:id", deleteAssignVehicle);
router.get("/search/:key", getSearchAssignVehicle);

module.exports = router;
