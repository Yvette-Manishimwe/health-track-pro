const express = require('express');
const router = express.Router();
const { heartRateControllerAdd, heartRateControllerGetll }= require("../controllers/heartRouteController.js");



router.get('/getAll', heartRateControllerGetll)
router.post('/addPatient', heartRateControllerAdd);

module.exports = router;
