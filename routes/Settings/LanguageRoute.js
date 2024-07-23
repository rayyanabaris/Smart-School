const router = require("express").Router();

const {
  getLanguageList,
  createLanguage,
  updateLanguage,
  deleteLanguage,
  getLanguageById,
  getSearchLanguage,

} = require("../../controller/Settings/LanguageCtrl");

router.get("/get", getLanguageList);
router.get("/get/:id", getLanguageById);
router.post("/create", createLanguage);
router.put("/update/:id", updateLanguage);
router.delete("/delete/:id", deleteLanguage);
router.get("/search/:key", getSearchLanguage);

module.exports = router;
