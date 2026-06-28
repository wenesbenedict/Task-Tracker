console.log("NEW SERVER VERSION LOADED");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Task = require("./models/Task");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");

const JWT_SECRET = "tasktracker_secret_key";

const app = express();

mongoose.connect(
  "mongodb://benedict_db_user:we28092007@ac-tvs1dda-shard-00-00.q75cjqx.mongodb.net:27017,ac-tvs1dda-shard-00-01.q75cjqx.mongodb.net:27017,ac-tvs1dda-shard-00-02.q75cjqx.mongodb.net:27017/?ssl=true&replicaSet=atlas-si0rif-shard-0&authSource=admin&appName=Cluster0"
)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.use(cors());
app.use(express.json());


// GET USER TASKS
app.get("/tasks", auth, async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.userId,
    });

    console.log("Tasks found:", tasks);

    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// GET HISTORY
app.get("/history", async (req, res) => {
  try {
    const history = await Task.find({
      status: {
        $in: ["Completed", "Failed"],
      },
    }).sort({ _id: -1 });

    res.json(history);
  } catch (err) {
    res.status(500).json(err);
  }
});


// CREATE TASK
app.post("/tasks", auth, async (req, res) => {
  try {
    console.log("Received task:", req.body);

    const task = new Task({
      text: req.body.text,
      user: req.user.userId,
    });

    const savedTask = await task.save();

    console.log("Saved task:", savedTask);

    res.json(savedTask);
  } catch (err) {
    console.log("Task save error:", err);
    res.status(500).json(err);
  }
});

// UPDATE TASK
app.put("/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        text: req.body.text,
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    res.json(updatedTask);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// DELETE TASK
app.delete("/tasks/:id", async (req, res) => {
  try {
    console.log("Deleting ID:", req.params.id);

    const deleted = await Task.findByIdAndDelete(
      req.params.id
    );

    console.log("Deleted document:", deleted);

    res.json({
      message: "Task deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// REGISTER
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } =
      req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.json({
      message: "User registered successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Login successful",
      token,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// GET PROFILE
app.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(
      req.user.userId
    ).select("-password");

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// START SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000");
});