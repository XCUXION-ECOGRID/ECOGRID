const mongoose = require('mongoose');

const companyRepUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('CompanyRepUser', companyRepUserSchema)