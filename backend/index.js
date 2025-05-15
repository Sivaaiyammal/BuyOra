const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/employee", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await EmployeeModel.findOne({ email });
    if (!user) return res.status(404).json("No record existed");

    if (user.password !== password) return res.status(401).json("Password is incorrect");

    res.status(200).json({ email: user.email, id: user._id });
  } catch (err) {
    res.status(500).json("Server error");
  }
});

// Register endpoint
app.post("/register", async (req, res) => {
  try {
    const employee = await EmployeeModel.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});


app.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await EmployeeModel.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
