const router = require("express").Router();

const {
  getVisitorBookList,
  createVisitorBook,
  updateVisitorBook,
  deleteVisitorBook,
  getVisitorBookById,
  getSearchVisitorBook,

} = require("../../controller/FrontOffice/VisitorsBookCtrl");

router.get("/get", getVisitorBookList);
router.get("/get/:id", getVisitorBookById);
router.post("/create", createVisitorBook);
router.put("/update/:id", updateVisitorBook);
router.delete("/delete/:id", deleteVisitorBook);
router.get("/search/:key", getSearchVisitorBook);

module.exports = router;
