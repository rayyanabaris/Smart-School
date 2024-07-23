const router = require("express").Router();

const {
  getStudentCategoryList,
  createStudentCategory,
  updateStudentCategory,
  deleteStudentCategory,
  getStudentCategoryById,
  getSearchStudentCategory,

} = require("../../controller/StudentInformation/StudentCategoryCtrl");

router.get("/get", getStudentCategoryList);
router.get("/get/:id", getStudentCategoryById);
router.post("/create", createStudentCategory);
router.put("/update/:id", updateStudentCategory);
router.delete("/delete/:id", deleteStudentCategory);
router.get("/search/:key", getSearchStudentCategory);

module.exports = router;
