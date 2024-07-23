const router = require("express").Router();

const {
  getPurposeList,
  createPurpose,
  updatePurpose,
  deletePurpose,
  getPurposeById,
  getSearchPurpose,

} = require("../../controller/FrontOffice/PurposeCtrl");

router.get("/get", getPurposeList);
router.get("/get/:id", getPurposeById);
router.post("/create", createPurpose);
router.put("/update/:id", updatePurpose);
router.delete("/delete/:id", deletePurpose);
router.get("/search/:key", getSearchPurpose);

module.exports = router;
