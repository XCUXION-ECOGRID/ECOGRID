const HomeUser = require("../models/homeUser")
const User = require("../models/users")

async function houseUserService(houserUserId, userData) {
    try {

        const { role, cart, wishlist, customePackages, orders } = userData

        if (cart || wishlist || customePackages || orders) {
            const updateHomeUser = await HomeUser.findByIdAndUpdate(houserUserId, {
                $set: { cart, wishlist, customePackages, orders }
            }, { new: true })

            if (!updateHomeUser) return "Failed to update home user"
            console.log("Home user updated successfully")
        }

        const updateUser = await User.findByIdAndUpdate(houserUserId, {
            $set: { role }
        }, { new: true })
        if (!updateUser) return "Failed to update user"

        return updateUser

        console.log("User updated successfully")

    } catch (error) {
        console.log("Error: ", error.message)
    }
}

module.exports = {
    houseUserService
}