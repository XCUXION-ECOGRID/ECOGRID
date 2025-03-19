const { createAudit, updateAudit, deleteAudit } = require("../service/auditService")
const { closeDB, connectDB } = require("../config/db.js")
const updateData = {
    auditype: "commercial",
    appliances: [
        { name: "Fan", powerRating: 75, usageHours: 5 },
        { name: "Light", powerRating: 10, usageHours: 6 }
    ]
};

/* async function testCreateAudit() {
    try {
        await connectDB()

        const audit = await createAudit(auditData)

        console.log(audit)
    } catch (error) {
        console.log(error.message)
    } finally {
        closeDB()
    }
} */

async function testUpdateAudit() {
    try {
        await connectDB()
        await updateAudit("67da804d5ae65f1d774fc58e", updateData)
    } catch (error) {
        console.log(error.message)
    } finally {
        await closeDB()
    }
}

async function testDeleteAudit() {
    try {
        await connectDB()
        await deleteAudit("67da804d5ae65f1d774fc58e")
    } catch (error) {
        console.log(error.message)
    } finally {
        closeDB()
    }
}

//testCreateAudit()
//testUpdateAudit()
testDeleteAudit()
