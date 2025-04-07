const { createUserCustomPackage, updateUserCustomPackage, getAllUserCustomePackages, deleteUserCustomPackage } = require("../service/userSolarPackageService");

async function createUserCustomPackageController(req, res) {
    try {
        const result = await createUserCustomPackage(req.body)
        if (!result) {
            return res.status(400).json({ message: "Unable to create new Package" })
        }
        return res.status(201).json({ message: "User Package created successfully", result })
    } catch (error) {

        return res.status(500).json({ message: "Unable to create new Package", error: error.message })
    }
}

async function updateUserCustomPackageController(req, res) {

    const { id: customePackageId } = req.params

    try {
        const result = await updateUserCustomPackage(customePackageId, req.body)
        if (!result) {
            return res.status(400).json({ message: "Unable to update Package" })
        }
        return res.status(200).json({ message: "User Package updated successfully", result })
    } catch (error) {
        return res.status(500).json({ message: "Unable to update Package", error: error.message })
    }
}

async function getAllUserCustomePackagesController(req, res) {
    try {
        const result = await getAllUserCustomePackages()
        if (!result) {
            return res.status(400).json({ message: "No user packages found" })
        }
        return res.status(200).json({ message: "User Packages found", result })
    } catch (error) {
        return res.status(500).json({ message: "Unable to fetch user packages", error: error.message })
    }
}

async function deleteUserCustomPackageController(req, res) {
    try {
        const { id: customePackageId } = req.params
        const result = await deleteUserCustomPackage(customePackageId)
        if (!result) {
            return res.status(400).json({ message: "Unable to delete Package" })
        }
        return res.status(200).json({ message: "User Package deleted successfully", result })
    } catch (error) {
        return res.status(500).json({ message: "Unable to delete Package", error: error.message })
    }
}

module.exports = {
    createUserCustomPackageController,
    updateUserCustomPackageController,
    getAllUserCustomePackagesController,
    deleteUserCustomPackageController,
}