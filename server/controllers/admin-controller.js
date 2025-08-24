const User = require("../models/user-model");
const Contact = require("../models/contact-model")

// handle the admin user logic
const getAllUsers = async (req, res) => {
  try {
    // console.log(req.body);
    const users = await User.find({},{password:0});
    if (!users || users.length===0) {
        //Handle the case where no users was found.
       return res.status(404).json({ msg: "No user Found" });
        
    }
   return res.status(200).json(users);
  } catch (error) {
   next(error);
  }
};

// handle the admin contact logic
const getAllContacts = async (req, res) => {
  try {
    // console.log(req.body);
    const contacts = await Contact.find();
    if (!contacts || contacts.length===0) {
        //Handle the case where no contacts was found.
       return res.status(404).json({ msg: "No contact Found" });
        
    }
   return res.status(200).json(contacts);
  } catch (error) {
   next(error);
  }
};

// handle the admin user delete logic

const deleteUserById = async (req,res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({_id:id});
    return res.status(200).json({ msg: "User Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

// handle the admin single user data logic

const getUserById = async (req,res) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({_id:id},{password:0});
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// handle the admin user update logic

const updateUserById = async (req,res) => {
  try {
    const id = req.params.id;    
    const updatedUserData = req.body;
    const updatedData = await User.updateOne({_id:id},{$set:updatedUserData});
    return res.status(200).json(updatedData);
  } catch (error) {
    next(error);
  }
};

// handle the admin user delete logic

const deleteContactsById = async (req,res) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({_id:id});
    return res.status(200).json({ msg: "Contact Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};


module.exports = {getAllUsers,getAllContacts,deleteUserById,getUserById,updateUserById,deleteContactsById};