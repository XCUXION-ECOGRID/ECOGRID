// set up branch details

const { setUpBranchProfile } = require("../service/companyBranchService");

async function setUpBranchProfileController (req, res) {
    const {email, name, location, contact, solarPackages, orders } = req.body;
    try {
        const result = await setUpBranchProfile(email, name, location, contact, solarPackages, orders);
        if(typeof result === 'string'){
            return res.status(400).json({message: result});
        }
        return res.status(201).json({message: 'Branch profile setup successfully', result});
    } catch (error) {
        console.log('Error caused while ', error);
        return res.status(500).json({message: 'Internal server error while setting up Branch profile'});
    }
}

module.exports = {
    setUpBranchProfileController
}