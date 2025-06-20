const express = require('express');
const { setUpBranchProfileController } = require('../controllers/companyBranchController');
const router = express.Router();

router.use(express.json());

router.post('/branch-profile', setUpBranchProfileController);

module.exports = router;