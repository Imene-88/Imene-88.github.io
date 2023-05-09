const router = require("express").Router();
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = new UserModel({
            full_name: req.body.full_name,
            username: req.body.username,
            type_of_color_blindness: req.body.type_of_color_blindness,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role,
        });
        user.save();
        res.status(200).json(user);
    } 
    catch(error) {
        console.log(error);
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});
        !user && res.status(404).json("You do not have an account on this platform");

        const checkPassword = await bcrypt.compare(req.body.password, user.password);
        !checkPassword && res.status(404).json("Your password is incorrect");

        res.status(200).json(user);
    }
    catch(error) {
        console.log(error);
    }
})

module.exports = router;