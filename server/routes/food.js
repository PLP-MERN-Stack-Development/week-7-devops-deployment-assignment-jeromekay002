const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const Food = require("../models/Food");

// Set up multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    },
});

const upload = multer({ storage: storage });

// GET all foods
router.get("/", async (req, res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch foods" });
    }
});

// POST a new food with image upload
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const { name, type } = req.body;
        const image = req.file ? req.file.filename : null;

        const food = new Food({ name, type, image });
        await food.save();
        res.status(201).json(food);
    } catch (error) {
        res.status(400).json({ error: "Bad Request" });
    }
});

// Update food
router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        const { name, type } = req.body;
        const update = { name, type };

        if (req.file) {
            update.image = req.file.filename; // ✅ add new image if uploaded
        }

        const updatedFood = await Food.findByIdAndUpdate(req.params.id, update, { new: true });
        res.status(200).json(updatedFood);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: "Failed to update food" });
    }
});

// Delete food
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Food.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Not Found" });

        res.json({ message: "Deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});
module.exports = router;