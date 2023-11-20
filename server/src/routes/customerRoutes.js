const { Router } = require("express");
const { GetClientDetails } = require("../controllers/customerController");

const router = Router();

router.post("/GetCustomerDetails", GetClientDetails);

module.exports = router;
