const express = require('express');
const api3rdPartyController = require('../controllers/api3rdPartyController.js');

const router = express.Router();
router.get("/youtubeList", api3rdPartyController.getDataYoutube);
router.post("/xenditPayment", api3rdPartyController.createInvoice);
router.get("/xenditPayment", api3rdPartyController.getXenditInvoice);


module.exports = router;