const router = require("express").Router();

const {
  getStudentAdmissionList,
  addStudentAdmission,
  getStudentDetails,
  updateStudentAdmission,
  deleteStudentAdmission,
  getStudentAdmissionById,
  getSearchStudentAdmission,
  getfilterStudentAdmissionList,
} = require("../../controller/StudentInformation/StudentAdmissionCtrl");
const upload = require("../../middlewares/uploadImage")

router.get("/get", getStudentAdmissionList);
router.get("/get/:id", getStudentAdmissionById);
router.post("/filter", getfilterStudentAdmissionList);
router.post("/search", getStudentDetails);
router.post("/add", upload.single('image'), addStudentAdmission);
router.put("/update/:id", updateStudentAdmission);
router.delete("/delete/:id", deleteStudentAdmission);
router.get("/search/:key", getSearchStudentAdmission);



module.exports = router;
