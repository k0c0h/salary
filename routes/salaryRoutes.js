const express = require('express');
const Salary = require('../models/salary');

const router = express.Router();

const PRICE_PER_HOUR = 15;

router.post('/salary', async (req, res) => {
    try {
        const { days, hours, salaryId } = req.body;

        if (!days || !hours || !salaryId) {
            return res.status(400).json({ error: 'days, hours and salaryId are required' });
        }

        const totalSalary = hours * PRICE_PER_HOUR * days;

        const salary = new Salary({
            salaryId,
            days,
            hours,
            priceperhour: PRICE_PER_HOUR, 
            salary: totalSalary
        });

        const savedSalary = await salary.save();
        res.status(201).json(savedSalary);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;