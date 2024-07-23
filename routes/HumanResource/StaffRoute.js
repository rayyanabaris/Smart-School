const router = require("express").Router();

const {
  getStaffList,
  addStaff,
  updateStaff,
  deleteStaff,
  getStaffById,
  getSearchStaff,
  getfilterStaffList,
} = require("../../controller/HumanResource/StaffCtrl");
const upload = require("../../middlewares/uploadImage")

router.get("/get", getStaffList);
router.get("/get/:id", getStaffById);
router.post("/filter", getfilterStaffList);
router.post("/add", upload.single('image'), addStaff);
router.put("/update/:id", updateStaff);
router.delete("/delete/:id", deleteStaff);
router.get("/search/:key", getSearchStaff);



module.exports = router;
