const router = require("express").Router();

const {
  getRoomTypeList,
  createRoomType,
  updateRoomType,
  deleteRoomType,
  getRoomTypeById,
  getSearchRoomType,

} = require("../../controller/Hostel/RoomTypesCtrl");

router.get("/get", getRoomTypeList);
router.get("/get/:id", getRoomTypeById);
router.post("/create", createRoomType);
router.put("/update/:id", updateRoomType);
router.delete("/delete/:id", deleteRoomType);
router.get("/search/:key", getSearchRoomType);

module.exports = router;
