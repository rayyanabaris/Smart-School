const router = require("express").Router();

const {
  getReferenceList,
  createReference,
  updateReference,
  deleteReference,
  getReferenceById,
  getSearchReference,

} = require("../../controller/FrontOffice/ReferenceCtrl");

router.get("/get", getReferenceList);
router.get("/get/:id", getReferenceById);
router.post("/create", createReference);
router.put("/update/:id", updateReference);
router.delete("/delete/:id", deleteReference);
router.get("/search/:key", getSearchReference);

module.exports = router;
