const express = require('express');
const router = express.Router();
const { heartRateControllerAdd, heartRateControllerGetll, heartRateControllerUpdate, heartRateControllerRemove  }= require("../controllers/heartRouteController.js");



router.get('/getAll', heartRateControllerGetll);
router.post('/addPatient', heartRateControllerAdd);
router.put('/updatePatient/:id', heartRateControllerUpdate);
router.delete('/removePatient/:id', heartRateControllerRemove);

module.exports = router;
