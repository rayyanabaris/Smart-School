const router = require("express").Router();

const {
  getLeaveTypeList,
  createLeaveType,
  updateLeaveType,
  deleteLeaveType,
  getLeaveTypeById,
  getSearchLeaveType,

} = require("../../controller/HumanResource/LeaveTypeCtrl");

router.get("/get", getLeaveTypeList);
router.get("/get/:id", getLeaveTypeById);
router.post("/create", createLeaveType);
router.put("/update/:id", updateLeaveType);
router.delete("/delete/:id", deleteLeaveType);
router.get("/search/:key", getSearchLeaveType);

module.exports = router;
