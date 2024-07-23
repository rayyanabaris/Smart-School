const router = require("express").Router();

const {
  getSubjectList,
  createSubject,
  updateSubject,
  deleteSubject,
  getSubjectById,
  getSearchSubject,

} = require("../../controller/Academics/SubjectCtrl");

router.get("/get", getSubjectList);
router.get("/get/:id", getSubjectById);
router.post("/create", createSubject);
router.put("/update/:id", updateSubject);
router.delete("/delete/:id", deleteSubject);
router.get("/search/:key", getSearchSubject);

module.exports = router;
