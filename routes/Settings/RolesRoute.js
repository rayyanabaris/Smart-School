const router = require("express").Router();

const {
  getRoleList,
  createRole,
  updateRole,
  deleteRole,
  getRoleById,
  getSearchRole,

} = require("../../controller/Settings/RolesCtrl");

router.get("/get", getRoleList);
router.get("/get/:id", getRoleById);
router.post("/create", createRole);
router.put("/update/:id", updateRole);
router.delete("/delete/:id", deleteRole);
router.get("/search/:key", getSearchRole);

module.exports = router;
