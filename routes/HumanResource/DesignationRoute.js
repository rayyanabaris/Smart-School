const router = require("express").Router();

const {
  getDesignationList,
  createDesignation,
  updateDesignation,
  deleteDesignation,
  getDesignationById,
  getSearchDesignation,

} = require("../../controller/HumanResource/DesignationCtrl");

router.get("/get", getDesignationList);
router.get("/get/:id", getDesignationById);
router.post("/create", createDesignation);
router.put("/update/:id", updateDesignation);
router.delete("/delete/:id", deleteDesignation);
router.get("/search/:key", getSearchDesignation);

module.exports = router;
