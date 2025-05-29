const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    companyRep: {
        id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, //id of admin users
        name: {type: String, required: true},   
        email: {type: String, required: true},   
    },
    name: {
        type: String,
        required: true
    }, 
    location: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    solarPackages:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SolarPackage',
    
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]
},
{
    timestamps: true
})

module.exports = mongoose.model('Branch', branchSchema);