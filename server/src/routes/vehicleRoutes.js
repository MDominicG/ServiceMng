const { Router } = require("express");
const { CreateNewVehicle, ShowAllVehicles, GetVehicleDetails, DeleteSelectedVehicle} = require("../controllers/vehicleController");

const router = Router();

router.post("/CreateNewVehicle", CreateNewVehicle);
router.post("/GetVehicleDetails", GetVehicleDetails);
router.post("/DeleteSelectedVehicle", DeleteSelectedVehicle);
router.get("/ShowAllVehicles", ShowAllVehicles)

module.exports = router;
