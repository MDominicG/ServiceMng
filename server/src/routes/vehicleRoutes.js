const { Router } = require("express");
const { CreateNewVehicle, ShowAllVehicles } = require("../controllers/vehicleController");

const router = Router();

router.post("/CreateNewVehicle", CreateNewVehicle);

router.get("/ShowAllVehicles", ShowAllVehicles)

module.exports = router;
