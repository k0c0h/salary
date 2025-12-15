const express = require('express');
const Compact = require('../models/compact'); 
const router = express.Router();

router.delete('/compact_disc/:idCompact', async (req, res) => {
    try {
        const compactObject = await Compact.findOne({idCompact: req.params.idCompact}); 
        if (compactObject == null) {
            return res.status(404).json({message: 'Compact not found'});
        }
        await compactObject.save();
        
        res.json({message: 'Compact deactivated successfully', compact: compactObject});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});