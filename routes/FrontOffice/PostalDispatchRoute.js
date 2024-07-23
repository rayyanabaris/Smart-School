const router = require("express").Router();

const {
  getPostalDispatchList,
  createPostalDispatch,
  updatePostalDispatch,
  deletePostalDispatch,
  getPostalDispatchById,
  getSearchPostalDispatch,

} = require("../../controller/FrontOffice/PostalDispatchCtrl");

router.get("/get", getPostalDispatchList);
router.get("/get/:id", getPostalDispatchById);
router.post("/create", createPostalDispatch);
router.put("/update/:id", updatePostalDispatch);
router.delete("/delete/:id", deletePostalDispatch);
router.get("/search/:key", getSearchPostalDispatch);

module.exports = router;
