const { Schema, model } = require('mongoose');

const ContestSchema = new Schema({
    
    description: String,
    requirements: {type: String, required: [true, 'Requirements is required']},
    startDate: {type: Date, default: Date.now},
    finishDate: {type: Date, required: [true, 'Completion date is required']}
    
});

module.exports = model('Contest', ContestSchema);