const router = require("express").Router();

const {
  getPhoneCallList,
  createPhoneCall,
  updatePhoneCall,
  deletePhoneCall,
  getPhoneCallById,
  getSearchPhoneCall,

} = require("../../controller/FrontOffice/PhoneCallCtrl");

router.get("/get", getPhoneCallList);
router.get("/get/:id", getPhoneCallById);
router.post("/create", createPhoneCall);
router.put("/update/:id", updatePhoneCall);
router.delete("/delete/:id", deletePhoneCall);
router.get("/search/:key", getSearchPhoneCall);

module.exports = router;
