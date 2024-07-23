const Currencies = require("../../models/Settings/CurrencyModel");
const asyncHandler = require("express-async-handler");

const getCurrencyList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalCurrency = await Currencies.countDocuments();
      const totalPages = Math.ceil(totalCurrency / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allCurrency = await Currencies.find().skip((page - 1) * limit).limit(limit)
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'Currencies List',
      data: allCurrency,
      page,
      nextPage,
      totalPages,
      totalCurrency
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getCurrencyById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaCurrency = await Currencies.findById(id)
    res.json(getaCurrency);
  } catch (error) {
    throw new Error(error);
  }
});
const createCurrency = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const Currency = await Currencies.create(req.body);
    res.json(Currency);
  } catch (error) {
    throw new Error(error);
  }
});
const updateCurrency = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedCurrency = await Currencies.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCurrency);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCurrency = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedCurrency = await Currencies.findByIdAndDelete(id);
    res.json(deletedCurrency);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchCurrency = asyncHandler(async (req, res) => {
  try {
    const getSearchCurrency = await Currencies.find({

      "$or":[
        {currency:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchCurrency);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getCurrencyList,
  getCurrencyById,
  getSearchCurrency,
  createCurrency,
  updateCurrency,
  deleteCurrency,
};
