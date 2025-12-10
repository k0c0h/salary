const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema(
    {
        salaryId: {type: String, required: true, unique: true},
        days: {type: Number, required: true},
        hours: {type: Number, required: true},
        priceperhour: {type: Number, required: true},
        salary: {type: Number, required: true}
        
},
    {
        collection: 'salary',
    }
);

module.exports = mongoose.model('Salary', salarySchema);