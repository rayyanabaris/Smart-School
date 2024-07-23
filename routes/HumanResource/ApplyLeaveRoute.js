const router = require("express").Router();

const {
  getApplyLeaveList,
  createApplyLeave,
  updateApplyLeave,
  deleteApplyLeave,
  getApplyLeaveById,
  getSearchApplyLeave,

} = require("../../controller/HumanResource/ApplyLeaveCtrl");

router.get("/get", getApplyLeaveList);
router.get("/get/:id", getApplyLeaveById);
router.post("/create", createApplyLeave);
router.put("/update/:id", updateApplyLeave);
router.delete("/delete/:id", deleteApplyLeave);
router.get("/search/:key", getSearchApplyLeave);

module.exports = router;
