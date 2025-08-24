const Service = require("../models/service-model");


const services = async (req, res) => {
  try {
    // console.log(req.body);
    const response = await Service.find();
    if (!response) {
        //Handle the case where no document was found.
        res.status(404).json({ msg: "No Service Found" });
        return;
    }
    res.status(200).json({ msg: response });
  } catch (error) {
    res.status(400).send({ msg: "Page not found" });
  }
};

module.exports = services;