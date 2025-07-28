const User = require("../models/userModels");
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //1. check if user exist
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    // 2. compare password
    const isMatch = await bycrpt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    //3. generate user token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 4. Return token
    res.status(200).json({ token, userId: user._id, email: user.email });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const signUp = async (req, res) => {
  try {
    const { email, password, firstName, lastName, userName } = req.body;

    const existingEmail = await User.findOne({ email });
    const existingUserName = await User.findOne({ userName });
    // console.log("existingEmail =>", existingEmail);
    if (existingEmail) {
      return res.status(400).json({
        message: "Email is already exist",
      });
    }
    if (existingUserName) {
      return res.status(400).json({ message: "Username is already exist" });
    }

    const hashedPassword = await bycrpt.hash(password, 10);

    // create user
    const newUser = User.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      message: "Account Craeted Successfully",
      userId: (await newUser).id,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.login = login;
exports.signUp = signUp;
