const router = require("express").Router();

const {
  getComplaintTypeList,
  createComplaintType,
  updateComplaintType,
  deleteComplaintType,
  getComplaintTypeById,
  getSearchComplaintType,

} = require("../../controller/FrontOffice/ComplainttypeCtrl");

router.get("/get", getComplaintTypeList);
router.get("/get/:id", getComplaintTypeById);
router.post("/create", createComplaintType);
router.put("/update/:id", updateComplaintType);
router.delete("/delete/:id", deleteComplaintType);
router.get("/search/:key", getSearchComplaintType);

module.exports = router;
