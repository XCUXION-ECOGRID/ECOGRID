// const CompanyRep = require("../models/companyRepModel")
// const User = require("../models/users")

// async function createCompanyRep(companyRepId, userData) {
//     try {

//         if (userData.role === "company rep") {
//             const updateUser = await User.findByIdAndUpdate(companyRepId, {
//                 $set: { role }
//             }, { new: true })

//             if (!updateUser) return "Failed to update user"

//             console.log("User updated successfully")

//             const newCompanyRep = new CompanyRep({
//                 ...userData,
//                 userId: updateUser._id,
//             })

//             await newCompanyRep.save()

//         }
//     } catch (error) {
//         console.log("Error: ", error.message)
//     }

// }

// modeule.exports = {
//     createCompanyRep
// }