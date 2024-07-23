const router = require("express").Router();

const {
  getComplainList,
  createComplain,
  updateComplain,
  deleteComplain,
  getComplainById,
  getSearchComplain,

} = require("../../controller/FrontOffice/ComplainCtrl");

router.get("/get", getComplainList);
router.get("/get/:id", getComplainById);
router.post("/create", createComplain);
router.put("/update/:id", updateComplain);
router.delete("/delete/:id", deleteComplain);
router.get("/search/:key", getSearchComplain);

module.exports = router;
