const router = require("express").Router();

const {
  getDisableReasonList,
  createDisableReason,
  updateDisableReason,
  deleteDisableReason,
  getDisableReasonById,
  getSearchDisableReason,

} = require("../../controller/StudentInformation/DisableReasonCtrl");

router.get("/get", getDisableReasonList);
router.get("/get/:id", getDisableReasonById);
router.post("/create", createDisableReason);
router.put("/update/:id", updateDisableReason);
router.delete("/delete/:id", deleteDisableReason);
router.get("/search/:key", getSearchDisableReason);

module.exports = router;
