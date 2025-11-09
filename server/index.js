const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
const Todo = require("./models/Todo");
const auth = require("./middleware/auth");

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URL = "mongodb://127.0.0.1:27017/employee_portal";
const JWT_SECRET = "replace_this_with_a_strong_secret";
const BCRYPT_SALT_ROUNDS = 10;

mongoose.connect(MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB error:", err));

app.get("/", (req, res) => res.send("Server working"));

// -------- AUTH ROUTES --------
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "Name, email, and password required" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already registered" });

    const hashed = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    const user = await User.create({ name, email, password: hashed });
    return res.json({ msg: "Signup success", userId: user._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    return res.json({ msg: "Login success", token, email: user.email, name: user.name });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

// -------- TODO ROUTES --------
app.post("/todos", auth(JWT_SECRET), async (req, res) => {
  try {
    const userId = req.user.id;
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title required" });

    const todo = await Todo.create({ user: userId, title, date: new Date() });
    return res.json({ msg: "Todo created", todo });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

app.get("/todos", auth(JWT_SECRET), async (req, res) => {
  try {
    const userId = req.user.id;
    const todos = await Todo.find({ user: userId }).sort({ date: -1 });
    return res.json({ todos });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

app.delete("/todos/:id", auth(JWT_SECRET), async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;
    const todo = await Todo.findOneAndDelete({ _id: id, user: userId });
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    return res.json({ msg: "Todo deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));



