const router = require("express").Router();

const {
  getPostalReciveList,
  createPostalRecive,
  updatePostalRecive,
  deletePostalRecive,
  getPostalReciveById,
  getSearchPostalRecive,

} = require("../../controller/FrontOffice/PostalReciveCtrl");

router.get("/get", getPostalReciveList);
router.get("/get/:id", getPostalReciveById);
router.post("/create", createPostalRecive);
router.put("/update/:id", updatePostalRecive);
router.delete("/delete/:id", deletePostalRecive);
router.get("/search/:key", getSearchPostalRecive);

module.exports = router;
