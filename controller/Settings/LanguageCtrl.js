const Languages = require("../../models/Settings/LanguageModel");
const asyncHandler = require("express-async-handler");

const getLanguageList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalLanguage = await Languages.countDocuments();
      const totalPages = Math.ceil(totalLanguage / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allLanguage = await Languages.find().skip((page - 1) * limit).limit(limit)
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'Languages List',
      data: allLanguage,
      page,
      nextPage,
      totalPages,
      totalLanguage
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getLanguageById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaLanguage = await Languages.findById(id)
    res.json(getaLanguage);
  } catch (error) {
    throw new Error(error);
  }
});
const createLanguage = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const Language = await Languages.create(req.body);
    res.json(Language);
  } catch (error) {
    throw new Error(error);
  }
});
const updateLanguage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedLanguage = await Languages.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedLanguage);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteLanguage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedLanguage = await Languages.findByIdAndDelete(id);
    res.json(deletedLanguage);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchLanguage = asyncHandler(async (req, res) => {
  try {
    const getSearchLanguage = await Languages.find({

      "$or":[
        {language:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchLanguage);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getLanguageList,
  getLanguageById,
  getSearchLanguage,
  createLanguage,
  updateLanguage,
  deleteLanguage,
};
