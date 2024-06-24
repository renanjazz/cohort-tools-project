const router = require("express").Router();
const userModel = require("../models/User.model");

router.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const findUser = await userModel.findById(id);

    if(!findUser){
      res.status(404).json({errorMessage:"User not found"})
    }
    res.status(200).json({message:"found user", findUser});
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "An error occurred while fetching the user" });

  }
});

// router.get("/api/users", async (req, res)=>{
//   const allUsers = await userModel.find();
//   res.status(200).json(allUsers)
// })

module.exports = router;
