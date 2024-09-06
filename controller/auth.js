const ErrorHandler = require('../errorhandle');
const User = require('../model/authModel')
exports.authUser_login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "invalid User" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid password" });
  }

  if (user.role==='mentor' && user.action !== 'yes') {
    return res.status(401).json({ message: "invalid User" });
  }
  if (user.role==='student' && user.action === 'reject') {
    return res.status(401).json({ message: "user Reject" });
  }
  if (user.role==='student' && user.action !== 'yes') {
    return res.status(401).json({ message: "invalid User" });
  }

  const role = user.role;
  res.cookie('role', role, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 3600000,
  });

  return res.status(200).json({ message: "Success", role: role ,user});
};

exports.registerUser = async (req, res, next) => {
  const { email, password, role, name, contact_no, classes, department } = req.body;

  try {
    console.log('user', req.body)
    // onsole.log('user1',req.query)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email alrready use" })
    } else {
      const user = await User.insertMany({
        email,
        password,
        role,
        name,
        contact_no,
        classes,
        department
      });
    }


    return res.status(200).json({ message: "Success" });
  }
  catch {

    return res.status(400).json({ message: "failed" });
  }
};
// exports.updateUser = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { action } = req.body;
// console.log(id,action)
//     // Find the user by ID
//     const user = await User.findByIdAndUpdate({_id:id}, {action},{
//       new: true, // Return the updated document 
//       runValidators: true 
//     });
  

//     // Update the user's details
//     // if (action) user.action = action;
//     // if (email) user.email = email;
//     // if (password) user.password = password;  // Make sure to hash the password before saving!
//     // if (role) user.role = role;

//     // Save the updated user
//     await user.save();

//     return res.status(200).json({ message: "User updated successfully", user });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const action = {...req.body};

    console.log(id, action);

    // Find and update the user by ID
    const user = await User.findByIdAndUpdate(id,  action,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


exports.logoutUser = (req, res, next) => {

  res.cookie("role", null, {
    expires: new Date(Date.now()),
  })
    .status(200)
    .json({
      success: true,
      message: "Loggedout",
    });
};
exports.getAllUsers = async (req, res, next) => {
  // console.log(req,res)
  try {
    const users = await User.find(); // Fetch all users from the database
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: "Server error" });
  }
};
exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const _id = id
    const user = await User.findById(_id); // Fetch user by ID
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.deleteUser = async(req,res) =>{
  try {
    const { id } = req.params;
    
    const user = await User.findByIdAndDelete(id); // Fetch user by ID
    
    return res.status(200).json({message:'User Deleted Successfully'});
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: "Server error" });
  }
}