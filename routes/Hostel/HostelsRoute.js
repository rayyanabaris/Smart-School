const router = require("express").Router();

const {
  getHostelList,
  createHostel,
  updateHostel,
  deleteHostel,
  getHostelById,
  getSearchHostel,

} = require("../../controller/Hostel/HostelsCtrl");

router.get("/get", getHostelList);
router.get("/get/:id", getHostelById);
router.post("/create", createHostel);
router.put("/update/:id", updateHostel);
router.delete("/delete/:id", deleteHostel);
router.get("/search/:key", getSearchHostel);

module.exports = router;
