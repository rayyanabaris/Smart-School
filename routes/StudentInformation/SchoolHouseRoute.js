const router = require("express").Router();

const {
  getSchoolHouseList,
  createSchoolHouse,
  updateSchoolHouse,
  deleteSchoolHouse,
  getSchoolHouseById,
  getSearchSchoolHouse,

} = require("../../controller/StudentInformation/SchoolHouseCtrl");

router.get("/get", getSchoolHouseList);
router.get("/get/:id", getSchoolHouseById);
router.post("/create", createSchoolHouse);
router.put("/update/:id", updateSchoolHouse);
router.delete("/delete/:id", deleteSchoolHouse);
router.get("/search/:key", getSearchSchoolHouse);

module.exports = router;
