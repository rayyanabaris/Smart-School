const router = require("express").Router();

const {
  getSubjectGroupList,
  createSubjectGroup,
  updateSubjectGroup,
  deleteSubjectGroup,
  getSubjectGroupById,
  getSearchSubjectGroup,

} = require("../../controller/Academics/SubjectGroupCtrl");

router.get("/get", getSubjectGroupList);
router.get("/get/:id", getSubjectGroupById);
router.post("/create", createSubjectGroup);
router.put("/update/:id", updateSubjectGroup);
router.delete("/delete/:id", deleteSubjectGroup);
router.get("/search/:key", getSearchSubjectGroup);

module.exports = router;
