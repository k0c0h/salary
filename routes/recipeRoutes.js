const express = require('express');
const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');
const router = express.Router();

router.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find({ isActive: true });
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/recipe', async (req, res) => {
    try {
        const { name, servings, description, ingredients, instructions, category } = req.body;

        if (!ingredients || !servings) {
            return res.status(400).json({ message: 'Ingredients and servings are required' });
        }

        let totalCost = 0;

        for (const ing of ingredients) {
            const ingredientData = await Ingredient.findOne({ productId: ing.productId });

            if (!ingredientData) {
                return res.status(400).json({
                    message: `Ingredient not found: ${ing.productId}`
                });
            }

            const cost = (ing.quantity / ingredientData.size) * ingredientData.price;
            totalCost += cost;

            ing.ingredientId = ingredientData._id;
        }

        const costPerServing = totalCost / servings;
        const pricePerServing = costPerServing * 2; 

        const recipe = new Recipe({
            name,
            servings,
            description,
            ingredients,
            instructions,
            category,
            costPerServing,
            pricePerServing,
            isActive: true
        });

        const newRecipe = await recipe.save();
        res.status(201).json(newRecipe);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
