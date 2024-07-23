const router = require("express").Router();

const {
  getVehicleList,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getVehicleById,
  getSearchVehicle,

} = require("../../controller/Transport/VehicleCtrl");
const upload = require("../../middlewares/uploadImage")

router.get("/get", getVehicleList);
router.get("/get/:id", getVehicleById);
router.post("/add",upload.single('image'), createVehicle);
router.put("/update/:id", updateVehicle);
router.delete("/delete/:id", deleteVehicle);
router.get("/search/:key", getSearchVehicle);

module.exports = router;
