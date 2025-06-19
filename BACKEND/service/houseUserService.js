const HomeUser = require("../models/homeUser")
const User = require("../models/users")

async function createHouseUser(houserUserId, userData) {
    try {

        const { role } = userData

        // if (cart || wishlist || customePackages || orders) {
        //     const updateHomeUser = await HomeUser.findByIdAndUpdate(houserUserId, {
        //         $set: { cart, wishlist, customePackages, orders }
        //     }, { new: true })

        //     if (!updateHomeUser) return "Failed to update home user"
        //     console.log("Home user updated successfully")
        // }

        if (role === "home user") {
            const updateUser = await User.findByIdAndUpdate(houserUserId, {
                $set: { role }
            }, { new: true })

            if (!updateUser) return "Failed to update user"

            console.log("User updated successfully")

            const newHomeUser = new HomeUser({
                userId: updateUser._id,
            })
            await newHomeUser.save()
            console.log("Home user created successfully")
            return newHomeUser
        }

    } catch (error) {
        console.log("Error: ", error.message)
    }
}

module.exports = {
    createHouseUser
}