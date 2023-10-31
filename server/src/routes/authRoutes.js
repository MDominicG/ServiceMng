const { Router } = require("express");
const { register, login, ShowAllUsers, CreateNewUser } = require("../controllers/authController");

const router = Router();

// user registration route
router.post("/register", register);

router.post("/CreateNewUser", CreateNewUser);

router.get("/GetAllUsers", ShowAllUsers);
// user login route
router.post("/login", login);

module.exports = router;
