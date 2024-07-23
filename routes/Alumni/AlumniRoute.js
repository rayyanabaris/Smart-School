const router = require("express").Router();

const {
  getAlumniList,
  createAlumni,
  updateAlumni,
  deleteAlumni,
  getAlumniById,
  getSearchAlumni,

} = require("../../controller/Alumni/AlumniCtrl");
const upload = require("../../middlewares/uploadImage")

router.get("/get", getAlumniList);
router.get("/get/:id", getAlumniById);
router.post("/add",upload.single('image'), createAlumni);
router.put("/update/:id", updateAlumni);
router.delete("/delete/:id", deleteAlumni);
router.get("/search/:key", getSearchAlumni);

module.exports = router;
