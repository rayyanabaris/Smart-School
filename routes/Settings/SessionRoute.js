const router = require("express").Router();

const {
  getSessionList,
  createSession,
  updateSession,
  deleteSession,
  getSessionById,
  getSearchSession,

} = require("../../controller/Settings/SessionCtrl");

router.get("/get", getSessionList);
router.get("/get/:id", getSessionById);
router.post("/create", createSession);
router.put("/update/:id", updateSession);
router.delete("/delete/:id", deleteSession);
router.get("/search/:key", getSearchSession);

module.exports = router;
