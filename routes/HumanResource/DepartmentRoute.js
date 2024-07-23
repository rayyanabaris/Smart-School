const router = require("express").Router();

const {
  getDepartmentList,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartmentById,
  getSearchDepartment,

} = require("../../controller/HumanResource/DepartmentCtrl");

router.get("/get", getDepartmentList);
router.get("/get/:id", getDepartmentById);
router.post("/create", createDepartment);
router.put("/update/:id", updateDepartment);
router.delete("/delete/:id", deleteDepartment);
router.get("/search/:key", getSearchDepartment);

module.exports = router;
