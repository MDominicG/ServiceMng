const Client = require("../database/schemas/Clients");

const GetClientDetails = async (req, res) => {
    try {
      const { id } = req.body;
      if (!id) {
        res.status(400).json({ error: "Id field is required" });
      } else {
        // Find the user by email
        const client_db = await Client.findOne({ where: { id } });

        if (!client_db) {
          return res.status(404).json({ error: "Client not found" });
        } else {
            res.json(client_db);
          }
        }
      } catch (error) {
      res.status(500).json({ error: "Error failed" });
    }
}

module.exports = {
    GetClientDetails
  };