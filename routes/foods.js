const express = require('express');
const { ObjectId } = require('mongodb');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// This will be set in index.js and shared via app.locals
let foodCollection;

// Middleware to inject DB collection
router.use((req, res, next) => {
  foodCollection = req.app.locals.foodCollection;
  next();
});

// GET all foods
router.get('/', async (req, res) => {
  try {
    const foods = await foodCollection.find().toArray();
    res.json(foods);
  } catch (err) {
    res.status(500).send('Error fetching foods');
  }
});

// POST single food with optional image
router.post('/', upload.single('image'), async (req, res) => {
  const { name, type } = req.body;
  const imagePath = req.file ? req.file.filename : null;

  const food = { name, type, image: imagePath };

  const result = await foodCollection.insertOne(food);
  res.send({ insertedId: result.insertedId });
});

// POST many foods
router.post('/many', async (req, res) => {
  try {
    const foodsArray = req.body;
    const result = await foodCollection.insertMany(foodsArray);
    res.send(`Inserted ${result.insertedCount} foods.`);
  } catch (err) {
    res.status(500).send('Error inserting multiple foods');
  }
});

// PUT update a food
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedFood = req.body;

    const result = await foodCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedFood }
    );

    if (result.modifiedCount === 1) {
      res.send(`Food with ID ${id} was updated`);
    } else {
      res.send(`No food found with ID ${id}`);
    }
  } catch (err) {
    res.status(500).send('Error updating food');
  }
});

// DELETE a food
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const result = await foodCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      res.send(`Food with ID ${id} was deleted`);
    } else {
      res.send(`No food found with ID ${id}`);
    }
  } catch (err) {
    res.status(500).send('Error deleting food');
  }
});

module.exports = router;
