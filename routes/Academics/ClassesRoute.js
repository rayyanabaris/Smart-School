const router = require("express").Router();

const {
  getClassList,
  createClass,
  updateClass,
  deleteClass,
  getClassById,
  getSearchClass,

} = require("../../controller/Academics/ClassesCtrl");

router.get("/get", getClassList);
router.get("/get/:id", getClassById);
router.post("/create", createClass);
router.put("/update/:id", updateClass);
router.delete("/delete/:id", deleteClass);
router.get("/search/:key", getSearchClass);

module.exports = router;
