const router = require("express").Router();

const {
  getEnquiryList,
  createEnquiry,
  getEnquiryByFilter,
  updateEnquiry,
  deleteEnquiry,
  getEnquiryById,
  getSearchEnquiry,

} = require("../../controller/FrontOffice/EnquiryCtrl");

router.get("/get", getEnquiryList);
router.get("/get/:id", getEnquiryById);
router.post("/filter", getEnquiryByFilter);
router.post("/create", createEnquiry);
router.put("/update/:id", updateEnquiry);
router.delete("/delete/:id", deleteEnquiry);
router.get("/search/:key", getSearchEnquiry);

module.exports = router;
