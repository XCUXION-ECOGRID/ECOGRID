const User = require('../models/users.js');
const Branch = require('../models/companyBranch.js');

async function setUpBranchProfile (email, name, location, contact, solarPackages, orders){
    if(!email || !name || !location || !contact){
        return 'Please provide the details for all fields'
    }

    const existingAdmin = await User.findOne({email});
    
    if(!existingAdmin){
        return 'No user found';
    }

    // make sure user is an admin
    if(existingAdmin.role !== 'admin'){
        return 'Unauthorized, you are not an admin'
    }


    const newBranch = new Branch({
        companyRep: {
            id: existingAdmin._id,
            name: existingAdmin.name,
            email: existingAdmin.email
        },
        name,
        location,
        contact,
        solarPackages,
        orders
    })

    const branch = await newBranch.save();
    if(!branch) return 'Branch profile failed to be created'

    return branch;

}

module.exports = {
    setUpBranchProfile
}