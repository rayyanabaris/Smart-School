const router = require("express").Router();

const {
  getHostelRoomList,
  createHostelRoom,
  updateHostelRoom,
  deleteHostelRoom,
  getHostelRoomById,
  getSearchHostelRoom,

} = require("../../controller/Hostel/HostelRoomsCtrl");

router.get("/get", getHostelRoomList);
router.get("/get/:id", getHostelRoomById);
router.post("/create", createHostelRoom);
router.put("/update/:id", updateHostelRoom);
router.delete("/delete/:id", deleteHostelRoom);
router.get("/search/:key", getSearchHostelRoom);

module.exports = router;
