const router = require("express").Router();

const {
  getSourceList,
  createSource,
  updateSource,
  deleteSource,
  getSourceById,
  getSearchSource,

} = require("../../controller/FrontOffice/SourceCtrl");

router.get("/get", getSourceList);
router.get("/get/:id", getSourceById);
router.post("/create", createSource);
router.put("/update/:id", updateSource);
router.delete("/delete/:id", deleteSource);
router.get("/search/:key", getSearchSource);

module.exports = router;
