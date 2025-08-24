const Contact = require("../models/contact-model");


const contactForm = async (req, res) => {
  try {
    // console.log(req.body);
    const response = req.body;
    await Contact.create(response);
    return  res.status(201).send({ msg: "Contact created successfully" });
  } catch (error) {
    res.status(400).send({ msg: "Page not found" });
  }
};

module.exports = contactForm;