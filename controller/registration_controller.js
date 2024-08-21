const Register = require('../model/registerModel')
exports.registerUser = async (req, res, next) => {
    const { name, email, contact_no, classes, qualification,fees } = req.body;
    console.log('user1',req.body)
  
    try {
      // console.log('user',req.body)
      
        const user = await Register.insertMany({
          email,
          qualification,
          name,
          contact_no,
          classes,
          fees
        });
      return res.status(200).json({ message: "Success" });
    }
    catch {
  
      return res.status(400).json({ message: "failed" });
    }
  };