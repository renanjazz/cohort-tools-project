const router = require("express").Router();
const userModel = require("../models/User.model");

router.get("/api/user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const findUser = await userModel.findById(id);
    res.status(200).json({message:"found user", findUser});
    
  } catch (error) {
    console.log(error);
    res.status(401).json({errorMessage:"user not found"})

  }
});

module.exports = router;
