const Vehicle = require("../database/schemas/Vehicles");
const Client = require("../database/schemas/Clients");
// User registration function
const register = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    if (!username) {
      res.status(400).json({ error: "Username field is required" });
    } else if (!email) {
      res.status(400).json({ error: "Email field is required" });
    } else if (!password) {
      res.status(400).json({ error: "Password field is required" });
    } else {
      const user_db = await User.findOne({ where: { email } });
      if (user_db) {
        res.status(400).json({ error: "Email already exist" });
      } else {
        // Hash the password
        const hashedPassword = hash_password(password);
        // Create a user record in the database
        const new_user = await User.create({
          username,
          email,
          password: hashedPassword,
        });
        // Generate JWT token
        const token = jwt.sign(
          { userId: new_user.id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1h" }
        );
        res.json({ message: "User registered successfully", token });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

const CreateNewVehicle = async (req, res) => {
  try {
    var clientData = req.body[0];
    var vehicleData = req.body[1];
    var clientId;
    let { clientName, clientType, clientEmail, clientPhone } = clientData
    let { clientVehicleNumber, clientVehicleVIN, clientVehicleMake, clientVehicleModel, clientVehicleYear, clientVehiclePower, clientVehicleGas, clientVehicleCapacity, clientVehicleOdometer, clientVehicleTasks, clientVehicleRTasks} = vehicleData
    const client_db = await Client.findOne({ where: { clientName } });
    if (!client_db) {
        (clientType) ? clientType = 2 : clientType = 1;
        const new_client = await Client.create({
            clientType: clientType, 
            clientName: clientName, 
            clientId: '', 
            clientPhone: clientPhone, 
            clientEmail: clientEmail, 
            clientReg: ''
          });
          console.log(new_client.id);
        res.json({ message: "Client registered successfully"});
    }
    (client_db) ? clientId = client_db.id : clientId = new_client.id;
    const new_vehicle = await Vehicle.create({
        clientId: clientId, 
        vehiclePlate: clientVehicleNumber, 
        vehicleVIN: clientVehicleVIN, 
        vehicleMake: clientVehicleMake, 
        vehicleModel: clientVehicleModel, 
        vehicleYear: clientVehicleYear, 
        vehiclePower: clientVehiclePower, 
        vehicleGas: clientVehicleGas, 
        vehicleCapacity: clientVehicleCapacity, 
        vehicleOdometer: clientVehicleOdometer, 
        vehicleTask: clientVehicleTasks, 
        vehicleRecomTask: clientVehicleRTasks
    });
    console.log(new_vehicle.id)
    // Create a user record in the database
    console.log(vehicleData)
    console.log(clientData.clientName)
    res.json(clientData);
    
  } catch (error) {
    res.status(500).json(error);
  }
}

const ShowAllVehicles = async (req, res) => {
    try {
        // async function clientName(index){
        // const value = await Client.findOne({
        //     raw: true,
        //     attributes: ['clientName'],
        //     where: {
        //       id: index
        //     }
        //   }).then(function(result){ return result.clientName})

        //   return value;
        // };
        // console.log("Test:" + await clientName(3));
        // const vehicles = await Vehicle.findAll();
        // vehicles.forEach(async (element, index) => {
        //     console.log(element.clientId);
        //     vehicles[index].clientId = await clientName(element.clientId)
        //     console.log(vehicles)
        // });
        // console.log(vehicles);
        // return res.json(vehicles);
        async function clientName(index) {
            const client = await Client.findOne({
              raw: true,
              attributes: ["clientName"],
              where: {
                id: index,
              },
            });
            return client.clientName;
          }
          
          async function getVehiclesWithClientNames() {
            const vehicles = await Vehicle.findAll();
          
            // Use a promise.all() to parallelize the client name lookups.
            const clientNames = await Promise.all(
              vehicles.map(async (vehicle) => await clientName(vehicle.clientId))
            );
          
            // Update the vehicles with their client names.
            vehicles.forEach((vehicle, index) => {
              vehicle.clientId = clientNames[index];
            });
          
            return vehicles;
          }
          
          // Get the vehicles with client names and return them as JSON.
          const vehicles = await getVehiclesWithClientNames();
          console.log(vehicles)
          return res.json(vehicles);
    } catch (error) {
      res.status(500).json({ error: "Error failed" });
    }
  }

module.exports = {
    CreateNewVehicle,
    ShowAllVehicles
  };