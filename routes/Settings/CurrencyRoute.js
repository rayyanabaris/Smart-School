const router = require("express").Router();

const {
  getCurrencyList,
  createCurrency,
  updateCurrency,
  deleteCurrency,
  getCurrencyById,
  getSearchCurrency,

} = require("../../controller/Settings/CurrencyCtrl");

router.get("/get", getCurrencyList);
router.get("/get/:id", getCurrencyById);
router.post("/create", createCurrency);
router.put("/update/:id", updateCurrency);
router.delete("/delete/:id", deleteCurrency);
router.get("/search/:key", getSearchCurrency);

module.exports = router;
