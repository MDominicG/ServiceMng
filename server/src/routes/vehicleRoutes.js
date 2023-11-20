const { Router } = require("express");
const { CreateNewVehicle, ShowAllVehicles, GetVehicleDetails} = require("../controllers/vehicleController");

const router = Router();

router.post("/CreateNewVehicle", CreateNewVehicle);
router.post("/GetVehicleDetails", GetVehicleDetails);
router.get("/ShowAllVehicles", ShowAllVehicles)

module.exports = router;
