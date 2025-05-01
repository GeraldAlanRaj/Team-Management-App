const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Team-Management-App", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

// Multer config for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// MongoDB Schema
const memberSchema = new mongoose.Schema({
  name: String,
  regno: String,
  profilePicture: String,
  experience: String,
  skills: String,
  projects: String,
  hobbies: String
});
const Member = mongoose.model("Member", memberSchema);

// Routes
app.get("/api/members", async (req, res) => {
  const members = await Member.find();
  res.json(members);
});

app.get("/api/members/:id", async (req, res) => {
  const member = await Member.findById(req.params.id);
  res.json(member);
});

app.post("/api/members", upload.single("profilePicture"), async (req, res) => {
  try {
    const data = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const newMember = new Member({
      ...data,
      profilePicture: imagePath.trim()
    });

    await newMember.save();
    res.status(201).send("Member added");
  } catch (err) {
    console.error("Error saving member:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/api/members/:id", async (req, res) => {
    try {
      const member = await Member.findById(req.params.id);
      if (!member) return res.status(404).send("Member not found");
  
      // Delete profile picture from disk
      if (member.profilePicture) {
        const filePath = path.join(__dirname, member.profilePicture);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
  
      await Member.findByIdAndDelete(req.params.id);
      res.send("Member deleted");
    } catch (err) {
      console.error("Error deleting member:", err);
      res.status(500).send("Internal Server Error");
    }
  });
  

// Start server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
