const express = require("express");
const { createUserCustomPackageController, updateUserCustomPackageController, getAllUserCustomePackagesController, deleteUserCustomPackageController } = require("../controllers/userSolarPackageController");
const router = express.Router();

router.post("/create", createUserCustomPackageController)
router.put("/update/:id", updateUserCustomPackageController)
router.get("/", getAllUserCustomePackagesController)
router.delete("/delete/:id", deleteUserCustomPackageController)

module.exports = router;