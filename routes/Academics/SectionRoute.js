const router = require("express").Router();

const {
  getSectionList,
  createSection,
  updateSection,
  deleteSection,
  getSectionById,
  getSearchSection,

} = require("../../controller/Academics/SectionCtrl");

router.get("/get", getSectionList);
router.get("/get/:id", getSectionById);
router.post("/create", createSection);
router.put("/update/:id", updateSection);
router.delete("/delete/:id", deleteSection);
router.get("/search/:key", getSearchSection);

module.exports = router;
