const { createAudit, updateAudit, deleteAudit } = require("../service/auditService")
const { closeDB, connectDB } = require("../config/db.js")
/* const updateData = {
    auditype: "commercial",
    appliances: [
        { name: "Fan", powerRating: 75, usageHours: 5 },
        { name: "Light", powerRating: 10, usageHours: 6 }
    ]
};
 */
const auditData = {
    user: "67da804d5ae65f1d774fc58e", // Replace with an actual ObjectId from your User collection
    auditype: "residential",
    appliances: [
        { name: "Refrigerator", powerRating: 150, usageHours: 24 },
        { name: "LED TV", powerRating: 80, usageHours: 5 },
        { name: "Ceiling Fan", powerRating: 75, usageHours: 6 },
        { name: "Laptop", powerRating: 60, usageHours: 8 },
        { name: "Air Conditioner", powerRating: 1500, usageHours: 6 }
    ],
    recommendation: [
        "Use energy-efficient LED bulbs",
        "Switch off appliances when not in use",
        "Consider using solar panels for energy efficiency"
    ]
}


async function testCreateAudit() {
    try {
        await connectDB()

        const audit = await createAudit(auditData)

        console.log(audit)
    } catch (error) {
        console.log(error.message)
    } finally {
        closeDB()
    }
}

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

testCreateAudit()
//testUpdateAudit()
//testDeleteAudit()
