const { createUser, getUserByEmail, deleteUserByEmail } = require('../service/userService.js')
const { connectDB, closeDB } = require('../config/db.js')


const userData = {
    name: "Beast Mensah",
    email: "mj@gmail.com",
    password: "qwerty123"
}

async function testCreateUser() {
    try {

        await connectDB()
        await createUser(userData)
        console.log(`User ${userData.email} created`)

    } catch (error) {
        console.log("Error:", error.message)
    } finally {
        await closeDB()
    }
}

async function testgetUserByEmail() {
    try {
        await connectDB()
        const user = await getUserByEmail("mj@gmail.com")
        console.log(user)
    } catch (error) {
        console.log("Error: ", error.message)
    } finally {
        await closeDB()
    }
}

async function testDeleteUserByEmail() {
    try {
        await connectDB()
        await deleteUserByEmail("mj@gmail.com")
    } catch (error) {
        console.log("Could not deleted User")
    } finally {
        closeDB()
    }
}

//testCreateUser()
//testgetUserByEmail()
//testDeleteUserByEmail()