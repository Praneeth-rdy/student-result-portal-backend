const express = require("express");
const router = express.Router();
const { getResults, addResult, deleteResult, updateResult, getMyResult, getAllStudents } = require('../controllers/main');
const { protect, adminCheck, studentCheck } = require('../middleware/auth');

router.route('/results').get(protect, adminCheck, getResults).post(protect, adminCheck, addResult);
router.route('/results/delete').get(protect, adminCheck, deleteResult);
router.route('/results/update').post(protect, adminCheck, updateResult);
router.route('/get-all-students').get(protect, adminCheck, getAllStudents);


router.route('/my-result').get(protect, studentCheck, getMyResult);

module.exports = router;